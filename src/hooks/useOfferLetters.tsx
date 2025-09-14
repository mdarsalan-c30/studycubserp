import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type OfferLetter = Tables<'offer_letters'>;
type OfferLetterInsert = TablesInsert<'offer_letters'>;
type OfferLetterUpdate = TablesUpdate<'offer_letters'>;

export const useOfferLetters = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: offerLetters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['offer-letters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offer_letters')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      return data as OfferLetter[];
    },
  });

  const createOfferLetterMutation = useMutation({
    mutationFn: async (offerLetter: OfferLetterInsert) => {
      const { data, error } = await supabase
        .from('offer_letters')
        .insert(offerLetter)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offer-letters'] });
      toast({
        title: "Offer letter created",
        description: "New offer letter has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create offer letter.",
        variant: "destructive",
      });
    },
  });

  const updateOfferLetterMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: OfferLetterUpdate }) => {
      const { data, error } = await supabase
        .from('offer_letters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offer-letters'] });
      toast({
        title: "Offer letter updated",
        description: "Offer letter has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update offer letter.",
        variant: "destructive",
      });
    },
  });

  const getOfferLetterStats = () => {
    if (!offerLetters) return { total: 0, draft: 0, sent: 0, accepted: 0, declined: 0 };

    return {
      total: offerLetters.length,
      draft: offerLetters.filter(offer => offer.status === 'draft').length,
      sent: offerLetters.filter(offer => offer.status === 'sent').length,
      accepted: offerLetters.filter(offer => offer.status === 'accepted').length,
      declined: offerLetters.filter(offer => offer.status === 'declined').length,
    };
  };

  return {
    offerLetters: offerLetters || [],
    isLoading,
    error,
    createOfferLetter: createOfferLetterMutation.mutate,
    updateOfferLetter: updateOfferLetterMutation.mutate,
    isCreating: createOfferLetterMutation.isPending,
    isUpdating: updateOfferLetterMutation.isPending,
    getOfferLetterStats,
  };
};