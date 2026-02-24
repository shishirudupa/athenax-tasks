"use client";
import React, { useState } from 'react';

export default function CreateTask() {
  // 1. Auto-generate Order ID
  const generateOrderID = () => "ATH-" + Math.random().toString(36).substr(2, 6).toUpperCase();

  const [formData, setFormData] = useState({
    orderID: generateOrderID(),
    orderName: '',
    totalQty: '',
    customerName: '',
    customerMobile: '', // Mandatory for WhatsApp
    deliveryDate: '',
    designer: '',
    printer: '',
    type: 'paper print',
    advance: 0,
    priority: 'Low',
    excelNo: '',
    notes: ''
  });

  const handleCreateTask = async (e) => {
    e.preventDefault();
    // 2. Validation
    if (!formData.customerMobile || !formData.orderName) {
      alert("Please enter Customer Mobile and Order Name!");
      return;
    }

    // Logic for Supabase and WhatsApp will go here in the next step
    alert(`Order ${formData.orderID} Created! WhatsApp will be sent to ${formData.customerMobile}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border-t-4 border-black">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Athenax Tech: New Task</h2>
        
        <form onSubmit={handleCreateTask} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-xs font-bold text-gray-500 uppercase">Order ID (Tracking)</label>
            <input type="text" value={formData.orderID} disabled className="mt-1 block w-full bg-gray-100 border p-2 rounded font-mono" />
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-bold text-gray-700 uppercase">Order Name *</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. IPL Jersey" 
              className="mt-1 block w-full border p-2 rounded outline-black"
              onChange={(e) => setFormData({...formData, orderName: e.target.value})}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase">Customer Name</label>
            <input 
              type="text" 
              className="mt-1 block w-full border p-2 rounded"
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-green-700 uppercase">Customer WhatsApp Number *</label>
            <input 
              required 
              type="tel" 
              placeholder="91XXXXXXXXXX" 
              className="mt-1 block w-full border-2 border-green-200 p-2 rounded bg-green-50 outline-green-500"
              onChange={(e) => setFormData({...formData, customerMobile: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Total Qty *</label>
            <input required type="number" className="mt-1 block w-full border p-2 rounded" onChange={(e) => setFormData({...formData, totalQty: e.target.value})}/>
          </div>
          <div>
            <label className="block text-xs font-bold text-red-600 uppercase">Delivery Date *</label>
            <input required type="date" className="mt-1 block w-full border p-2 rounded" onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}/>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Designer</label>
            <select className="mt-1 block w-full border p-2 rounded" onChange={(e) => setFormData({...formData, designer: e.target.value})}>
              <option>Select</option>
              <option>Designer 1</option>
              <option>Designer 2</option>
              <option>Designer 3</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase">Printer</label>
            <select className="mt-1 block w-full border p-2 rounded" onChange={(e) => setFormData({...formData, printer: e.target.value})}>
              <option>Printer 1</option>
              <option>Printer 2</option>
              <option>Printer 3</option>
              <option>Printer 4</option>
            </select>
          </div>

          <div className="col-span-2 pt-4 border-t">
            <label className="block text-xs font-bold text-gray-700 uppercase">Notes / Instructions</label>
            <textarea rows="3" className="mt-1 block w-full border p-2 rounded" placeholder="Paste names or extra notes..." onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
          </div>

          <button type="submit" className="col-span-2 bg-black hover:bg-gray-800 text-white font-bold py-3 rounded shadow-lg uppercase transition-all">
            Approve & Send WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
