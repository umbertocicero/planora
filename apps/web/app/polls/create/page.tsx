'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, CheckCircle2, ListChecks, Calendar } from 'lucide-react';
import { toast } from 'sonner';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const pollTypes = [
  {
    id: 'single_choice',
    icon: CheckCircle2,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'multiple_choice',
    icon: ListChecks,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 'calendar',
    icon: Calendar,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
] as const;

const createPollSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(2000).optional(),
  pollType: z.enum(['single_choice', 'multiple_choice', 'calendar']),
  options: z.array(
    z.object({
      text: z.string().min(1, 'Option text is required'),
    })
  ).min(2, 'At least 2 options required'),
  allowAnonymous: z.boolean().default(true),
  requireName: z.boolean().default(true),
  showResultsBeforeVote: z.boolean().default(true),
});

type CreatePollForm = z.infer<typeof createPollSchema>;

export default function CreatePollPage() {
  const t = useTranslations('poll.create');
  const tTypes = useTranslations('poll.types');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePollForm>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      pollType: 'single_choice',
      options: [{ text: '' }, { text: '' }],
      allowAnonymous: true,
      requireName: true,
      showResultsBeforeVote: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const selectedType = watch('pollType');

  const onSubmit = async (data: CreatePollForm) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call the API
      console.log('Creating poll:', data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Poll created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create poll');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Poll Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pollType')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {pollTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setValue('pollType', type.id)}
                        className={cn(
                          'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-transparent bg-muted hover:border-muted-foreground/20'
                        )}
                      >
                        <div className={cn('rounded-lg p-2', type.bgColor)}>
                          <Icon className={cn('h-6 w-6', type.color)} />
                        </div>
                        <span className="text-sm font-medium">
                          {tTypes(type.id)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Poll Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('pollTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    {...register('title')}
                    placeholder={t('pollTitlePlaceholder')}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">{t('description')}</Label>
                  <Textarea
                    {...register('description')}
                    id="description"
                    placeholder={t('descriptionPlaceholder')}
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('options')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`options.${index}.text`)}
                      placeholder={t('optionPlaceholder', { number: index + 1 })}
                      className={
                        errors.options?.[index]?.text ? 'border-destructive' : ''
                      }
                    />
                    {fields.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.options && (
                  <p className="text-sm text-destructive">
                    {errors.options.message || errors.options.root?.message}
                  </p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ text: '' })}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('addOption')}
                </Button>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('settings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowAnonymous"
                    {...register('allowAnonymous')}
                    defaultChecked
                  />
                  <Label htmlFor="allowAnonymous">{t('allowAnonymous')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requireName"
                    {...register('requireName')}
                    defaultChecked
                  />
                  <Label htmlFor="requireName">{t('requireName')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showResultsBeforeVote"
                    {...register('showResultsBeforeVote')}
                    defaultChecked
                  />
                  <Label htmlFor="showResultsBeforeVote">
                    Show results before voting
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : t('createPoll')}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
