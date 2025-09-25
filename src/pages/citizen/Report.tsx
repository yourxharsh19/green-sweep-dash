import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { MapPin, Image as ImageIcon, Send } from 'lucide-react';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  location: z.string().min(3, 'Location is required'),
  description: z.string().min(10, 'Please describe the issue'),
  image: z.instanceof(File).optional().or(z.any().optional()),
});

type FormValues = z.infer<typeof schema>;

const Report = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast({ title: 'Issue reported', description: 'Thank you for helping keep the city clean.' });
    reset();
    navigate('/dashboard');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Report an Issue</h1>
        <p className="text-muted-foreground">Overflowing bin, littering spot, or missed collection</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Provide information so authorities can respond quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input placeholder="e.g., Overflowing bin near park" {...register('title')} />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</label>
              <Input placeholder="e.g., Park Avenue, Gate 2" {...register('location')} />
              {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea rows={5} placeholder="Describe what happened..." {...register('description')} />
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Photo (optional)</label>
              <Input type="file" accept="image/*" {...register('image')} />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;


