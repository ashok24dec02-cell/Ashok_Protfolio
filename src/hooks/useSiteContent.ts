import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteContent = () => {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      
      const map: Record<string, Record<string, string>> = {};
      data?.forEach((row) => {
        map[row.section_key] = (row.content as Record<string, string>) || {};
      });
      return map;
    },
  });
};
