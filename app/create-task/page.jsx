"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Connect to the database using the keys you added to Vercel
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreateTask() {
  const generateOrderID = () => "ATH-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  const [formData, setFormData] = useState({
    order_id: generateOrderID(),
    order_name: '',
    total_qty: '',
    customer_mobile: '',
    delivery_date: '',
    designer_name: '',
    printer_assigned: 'Printer 1',
    job_type: 'paper print',
    priority: 'Low',
    status: 'Order Approved' 
  });

  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Save to Supabase
    const { error } = await supabase.from('tasks').insert([formData]);

    if (error) {
      alert("Database Error: " + error.message);
    } else {
      // 2. Open WhatsApp with pre-filled message
      const message = `*Athenax Tech: Order Approved*%0A%0AOrder ID: ${formData.order_id}%0AOrder: ${formData.order_name}%0AQty: ${formData.total_qty}%0A%0AWe will notify you at the next stage!`;
      window.open(`https://wa.me/${formData.customer_mobile}?text=${message}`, '_blank');
      
      alert("Success! Order saved to Athenax Portal.");
      // Reset for next task
      setFormData({ ...formData, order_id: generateOrderID(), order_name: '', total_qty: '', customer_mobile: '' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border-t-8 border-black text-black">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tighter italic">ATHENAX TECH</h1>
          <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Jersey OS v1.0</p>
        </div>

        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-black">
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">Tracking ID</label>
              <input type="text" value={formData.order_id} disabled className="w-full bg-gray-50 border p-2 rounded mt-1 font-mono text-sm text-gray-400" />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-gray-600 uppercase">Order Name *</label>
              <input required type="text" placeholder="e.g. Royal Challengers" className="w-full border p-2 rounded mt-1 focus:ring-2 ring-black outline-none" 
                onChange={(e) => setFormData({...formData, order_name: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-green-600 uppercase">WhatsApp (91XXXXXXXXXX) *</label>
            <input required type="tel" placeholder="919876543210" className="w-full border-2 border-green-50 p-2 rounded mt-1 outline-none focus:border-green-500" 
              onChange={(e) => setFormData({...formData, customer_mobile: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-600 uppercase">Quantity *</label>
              <input required type="number" className="w-full border p-2 rounded mt-1" onChange={(e) => setFormData({...formData, total_qty: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-red-500 uppercase">Delivery Date *</label>
              <input required type="date" className="w-full border p-2 rounded mt-1" onChange={(e) => setFormData({...formData, delivery_date: e.target.value})} />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-black text-white font-bold py-4 rounded-xl mt-4 hover:bg-gray-800 transition-all shadow-lg uppercase tracking-widest disabled:bg-gray-400">
            {loading ? "Syncing..." : "Approve & Send WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
