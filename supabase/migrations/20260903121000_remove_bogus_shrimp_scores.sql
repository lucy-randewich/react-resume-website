delete from public.shrimp_scores
where (id, player_name, score) in (
  (23, 'jillwones', 9999),
  (24, 'jillwones9999', 9999),
  (25, '10k?', 10000)
);
