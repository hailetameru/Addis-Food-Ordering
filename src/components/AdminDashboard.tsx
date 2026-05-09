import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, Utensils, ShoppingCart, TrendingUp, 
  Search, Plus, MoreVertical, Edit2, Trash2, X, Save, 
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { useApp } from '../context/AppContext';

const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const CATEGORY_DATA = [
  { name: 'Meat', value: 400 },
  { name: 'Vegetarian', value: 300 },
  { name: 'Coffee', value: 100 },
  { name: 'Stews', value: 200 },
];

const COLORS = ['#2E4730', '#EBB02D', '#D02929', '#4A2B1E'];

export default function AdminDashboard() {
  const { setIsAdminView, menuItems, updateMenuItem, addMenuItem, deleteMenuItem, t } = useApp();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const [newItem, setNewItem] = useState({
    name: '',
    amName: '',
    description: '',
    price: 0,
    category: 'stews',
    image: 'https://images.unsplash.com/photo-1541014741259-df549fa9ba6f?q=80&w=400&h=300&fit=crop'
  });

  const handleEditInit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm) {
      updateMenuItem(editingId, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem(newItem);
    setIsAddingItem(false);
    setNewItem({
      name: '',
      amName: '',
      description: '',
      price: 0,
      category: 'stews',
      image: 'https://images.unsplash.com/photo-1541014741259-df549fa9ba6f?q=80&w=400&h=300&fit=crop'
    });
  };

  return (
    <div className="min-h-screen bg-teff-brown/5 flex flex-col pt-20">
      <div className="bg-white border-b border-teff-brown/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-ethiopia-green rounded-2xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-teff-brown">Admin Dashboard</h1>
              <p className="text-sm text-teff-brown/40">Manage your restaurant and orders</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdminView(false)}
            className="bg-white border border-teff-brown/10 px-6 py-2 rounded-xl text-sm font-bold hover:bg-teff-brown/5 transition-colors"
          >
            Exit Admin Mode
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 pb-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<TrendingUp />} label="Total Sales" value="45,280 ETB" color="green" />
          <StatCard icon={<ShoppingCart />} label="Active Orders" value="12" color="yellow" />
          <StatCard icon={<Users />} label="Total Users" value="248" color="red" />
          <StatCard icon={<Utensils />} label="Menu Items" value={menuItems.length.toString()} color="teff" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-teff-brown/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold">Weekly Sales Record</h3>
                <p className="text-sm text-teff-brown/40 italic">Overview of revenue movement</p>
              </div>
              <BarChart3 className="w-6 h-6 text-ethiopia-green" />
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#4A2B1E', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#4A2B1E', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#2E4730" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-teff-brown/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold">Category Distribution</h3>
                <p className="text-sm text-teff-brown/40 italic">Sales performance by food type</p>
              </div>
              <PieChartIcon className="w-6 h-6 text-ethiopia-yellow" />
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {CATEGORY_DATA.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-xs font-bold text-teff-brown/60 uppercase tracking-wider">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Management Section */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-teff-brown/5 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold">Menu Management</h3>
              <p className="text-sm text-teff-brown/40">Edit prices, names and add new dishes</p>
            </div>
            <button 
              onClick={() => setIsAddingItem(true)}
              className="bg-ethiopia-green text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-ethiopia-green/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Food Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-teff-brown/40 uppercase tracking-wider border-b border-teff-brown/5">
                <tr>
                  <th className="pb-4">Image</th>
                  <th className="pb-4">Name (EN/AM)</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Price (ETB)</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {menuItems.map(item => (
                  <tr key={item.id} className="border-b border-teff-brown/5 group">
                    <td className="py-4">
                      <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt={item.name} />
                    </td>
                    <td className="py-4">
                      {editingId === item.id ? (
                        <div className="flex flex-col gap-1">
                          <input 
                            className="bg-teff-brown/5 px-2 py-1 rounded" 
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          />
                          <input 
                            className="bg-teff-brown/5 px-2 py-1 rounded amharic" 
                            value={editForm.amName}
                            onChange={e => setEditForm({ ...editForm, amName: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-teff-brown">{item.name}</p>
                          <p className="text-xs text-teff-brown/40 amharic">{item.amName}</p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 capitalize text-teff-brown/60 font-medium">{item.category}</td>
                    <td className="py-4">
                      {editingId === item.id ? (
                        <input 
                          type="number"
                          className="bg-teff-brown/5 px-2 py-1 rounded w-20 font-bold text-ethiopia-green" 
                          value={editForm.price}
                          onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        />
                      ) : (
                        <span className="font-bold text-ethiopia-green">{item.price} ETB</span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === item.id ? (
                          <>
                            <button 
                              onClick={handleSaveEdit}
                              className="p-2 text-ethiopia-green hover:bg-ethiopia-green/10 rounded-lg transition-colors"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => { setEditingId(null); setEditForm(null); }}
                              className="p-2 text-ethiopia-red hover:bg-ethiopia-red/10 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditInit(item)}
                              className="p-2 text-teff-brown/40 hover:text-teff-brown hover:bg-teff-brown/5 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteMenuItem(item.id)}
                              className="p-2 text-teff-brown/40 hover:text-ethiopia-red hover:bg-ethiopia-red/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Food OverLay */}
        <AnimatePresence>
          {isAddingItem && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddingItem(false)}
                className="fixed inset-0 bg-teff-brown/40 backdrop-blur-md z-[200]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 m-auto w-full max-w-2xl h-fit bg-cotton-white rounded-[2.5rem] shadow-2xl z-[210] overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Add New Food Item</h2>
                    <button onClick={() => setIsAddingItem(false)} className="p-2 hover:bg-teff-brown/5 rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddSubmit} className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Name (English)</label>
                        <input 
                          required
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20"
                          placeholder="e.g. Doro Wat"
                          value={newItem.name}
                          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Name (Amharic)</label>
                        <input 
                          required
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20 amharic"
                          placeholder="ዶሮ ወጥ"
                          value={newItem.amName}
                          onChange={e => setNewItem({ ...newItem, amName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Price (ETB)</label>
                        <input 
                          required
                          type="number"
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20"
                          placeholder="350"
                          value={newItem.price || ''}
                          onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Image URL</label>
                        <input 
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20"
                          placeholder="https://..."
                          value={newItem.image}
                          onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Category</label>
                        <select 
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20"
                          value={newItem.category}
                          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                        >
                          <option value="stews">Stews</option>
                          <option value="meat">Meat Selection</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="coffee">Coffee Ceremony</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-teff-brown/40 uppercase mb-2 block">Description</label>
                        <textarea 
                          required
                          rows={4}
                          className="w-full bg-teff-brown/5 border-none rounded-xl p-3 outline-none focus:ring-2 ring-ethiopia-green/20 resize-none"
                          placeholder="Short description of the dish..."
                          value={newItem.description}
                          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="col-span-2 pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-teff-brown text-white py-4 rounded-2xl font-bold hover:bg-ethiopia-green transition-all shadow-xl shadow-teff-brown/20"
                      >
                        Register New Food Item
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  const colors: any = {
    green: 'text-ethiopia-green bg-ethiopia-green/10',
    yellow: 'text-ethiopia-yellow bg-ethiopia-yellow/10',
    red: 'text-ethiopia-red bg-ethiopia-red/10',
    teff: 'text-teff-brown bg-teff-brown/10'
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-teff-brown/5"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colors[color]}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      </div>
      <p className="text-sm text-teff-brown/40 mb-1 font-medium">{label}</p>
      <p className="text-2xl font-bold text-teff-brown">{value}</p>
    </motion.div>
  );
}
