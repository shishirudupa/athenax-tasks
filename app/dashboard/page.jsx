"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const stages = ['Order Approved', 'Designing', 'Printing', 'Ready to Ship'];

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    setTasks(data || []);
  };

  const updateStatus = async (id, currentStatus) => {
    const nextIndex = stages.indexOf(currentStatus) + 1;
    if (nextIndex < stages.length) {
      await supabase.from('tasks').update({ status: stages[nextIndex] }).eq('id', id);
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen p-8 text-black bg-gray-50">
      <h1 className="text-3xl font-black mb-8 border-b-4 border-black pb-2 italic">ATHENAX PRODUCTION BOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stages.map(stage => (
          <div key={stage} className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-black text-white p-3 font-bold text-xs uppercase tracking-widest rounded-t-lg flex justify-between">
              {stage}
              <span className="bg-white text-black px-2 rounded-full">{tasks.filter(t => t.status === stage).length}</span>
            </div>
            <div className="p-4 space-y-4">
              {tasks.filter(t => t.status === stage).map(task => (
                <div key={task.id} className="p-3 border-2 border-gray-100 rounded hover:border-black transition-all bg-white">
                  <p className="text-[10px] font-mono text-gray-400">{task.order_id}</p>
                  <h3 className="font-black uppercase text-sm">{task.order_name}</h3>
                  <p className="text-[10px] font-bold text-gray-500 mb-3">Qty: {task.total_qty}</p>
                  {stage !== 'Ready to Ship' && (
                    <button onClick={() => updateStatus(task.id, stage)} className="w-full bg-gray-100 text-[10px] font-bold py-2 rounded hover:bg-black hover:text-white transition-colors uppercase border border-gray-200">
                      Move to {stages[stages.indexOf(stage) + 1]} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
