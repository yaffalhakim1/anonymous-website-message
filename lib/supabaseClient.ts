import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ygqomvfxsonofijrycta.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncW9tdmZ4c29ub2ZpanJ5Y3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxNDQ5MDIsImV4cCI6MTk5OTcyMDkwMn0.fo83fln82CvaKfrJnAyCdrGLraA23oD2EWbidOmYpWQ"
);
