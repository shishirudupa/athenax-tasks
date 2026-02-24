"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// This connects your website to the database using the keys we just added to Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
