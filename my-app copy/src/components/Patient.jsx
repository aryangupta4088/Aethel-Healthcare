import { useState } from 'react';
import {
  Heart,
  Droplet,
  Thermometer,
  Wind,
  Calendar,
  Lock,
  AlertCircle,
  Send,
  Clock,
  Pill,
  Wifi,
  Bell,
  User,
  Shield,
  CheckCircle,
  Sparkles,
  FlaskConical,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

export default function Patient({ onBack }) {
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf9ee]">
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft size={20} className="text-amber-900" />
              </button>
            )}
            <div className="text-2xl font-bold text-amber-900">AetherHealth</div>
          </div>

          <div className="hidden md:flex gap-8">
            <a className="text-amber-800 font-bold border-b-2 border-amber-600 pb-1 hover:text-amber-600 transition-colors">
              My Records
            </a>
            <a className="text-stone-600 font-medium hover:text-amber-600 transition-colors">
              Manage Consent
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-amber-900 to-amber-700 px-6 py-2 rounded-full text-white font-bold flex items-center gap-2 hover:shadow-lg transition-shadow">
              <Sparkles size={16} />
              Sandesh Assistant
            </button>
            <div className="flex items-center gap-2">
              <Bell className="text-stone-600 p-2 w-10 h-10 hover:bg-stone-100 rounded-full cursor-pointer transition-colors" />
              <User className="text-stone-600 p-2 w-10 h-10 hover:bg-stone-100 rounded-full cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full px-8 py-10 flex-grow">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Health Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back, <span className="font-bold text-amber-700">Priya Sharma</span>. Your sanctuary for healing is
            ready.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[30%_40%_30%] gap-8">
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-2xl border-2 border-emerald-200">
                  PS
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Priya Sharma</h2>
                  <p className="text-sm text-gray-600">45, Female | MRN: 2024-0456</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <CheckCircle className="text-emerald-600" size={20} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600">Insurance</p>
                    <p className="text-sm font-medium text-gray-900">ABHA Verified Plan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <AlertCircle className="text-amber-700" size={20} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600">Primary Doctor</p>
                    <p className="text-sm font-medium text-gray-900">Dr. Anil Sharma</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-900">Upcoming Schedule</h3>
                <Calendar className="text-gray-600" size={20} />
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Echocardiogram', time: 'Today, 2:30 PM • Teal Zone', color: 'bg-blue-400' },
                  { title: 'Blood Draw', time: 'Tomorrow, 9:00 AM • Violet Zone', color: 'bg-purple-400' },
                  { title: 'Follow-up', time: 'Apr 20, 10:30 AM • Green Zone', color: 'bg-emerald-400' },
                ].map((event, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className={`w-1 h-12 ${event.color} rounded-full`}></div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Blockchain Consent</h3>
                <Shield className="text-emerald-600" size={20} />
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Dr. Anil Sharma', enabled: true },
                  { name: 'Dr. Mehta', enabled: false },
                  { name: 'Dr. Gupta', enabled: true },
                ].map((doctor, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{doctor.name}</span>
                    <div className={`w-10 h-5 rounded-full relative ${doctor.enabled ? 'bg-amber-600' : 'bg-gray-300'}`}>
                      <div
                        className={`absolute w-3 h-3 bg-white rounded-full top-1 ${doctor.enabled ? 'right-1' : 'left-1'}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest">
                <Lock size={14} />
                Verified on Blockchain
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Vitals Snapshot</h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Heart, label: 'Heart Rate (bpm)', value: '72', color: 'text-red-500' },
                  { icon: Droplet, label: 'BP (mmHg)', value: '118/78', color: 'text-blue-500' },
                  { icon: Thermometer, label: 'Temp (°F)', value: '98.6', color: 'text-orange-500' },
                  { icon: Wind, label: 'SpO2', value: '98%', color: 'text-blue-400' },
                ].map((vital, idx) => {
                  const Icon = vital.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 bg-white rounded-2xl flex flex-col items-center text-center border border-stone-100"
                    >
                      <Icon className={`${vital.color} mb-2`} size={28} />
                      <p className="text-2xl font-bold text-gray-900">{vital.value}</p>
                      <p className="text-xs text-gray-600 font-medium">{vital.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-900">Recent Medical Records</h3>
                <button className="text-amber-900 text-sm font-bold hover:text-amber-700">View All</button>
              </div>

              <div className="p-5 bg-white rounded-2xl flex items-center justify-between border border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 border border-amber-200">
                    <FlaskConical size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">CBC with Differential</p>
                    <p className="text-xs text-gray-600">
                      Apr 15 • Status: <span className="text-emerald-600 font-bold">Final</span>
                    </p>
                  </div>
                </div>
                <CheckCircle className="text-emerald-600" size={20} />
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-800 to-amber-900 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shrink-0 border border-white/30">
                  <Sparkles size={20} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">AI Health Insights</h3>
                  <p className="text-amber-50/80 leading-relaxed italic text-sm">
                    "Great news Priya! Your cholesterol levels show a 12% improvement over the last 3 months. Keep up the
                    Mediterranean diet. Don't forget your Echocardiogram at 2:30 PM today in the Teal Zone."
                  </p>
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-colors">
                    Ask about Labs
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-stone-100 shadow-sm flex flex-col h-80">
              <div className="p-5 border-b border-stone-100 flex items-center gap-3 bg-amber-50/30">
                <MessageCircle className="text-amber-700" size={20} />
                <h3 className="font-bold text-sm text-gray-900">Sandesh Multilingual Assistant</h3>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl max-w-[85%]">
                  <p className="text-xs text-gray-900">
                    नमस्ते प्रिया, आपका इकोकार्डियोग्राम 'Teal Zone' में है। क्या आप वहाँ का रास्ता जानना चाहती हैं?
                  </p>
                </div>

                <div className="bg-amber-100/50 p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl max-w-[85%] ml-auto">
                  <p className="text-xs font-medium text-gray-900">Yes, please guide me to the Teal Zone.</p>
                </div>

                <div className="bg-gray-100 p-3 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl max-w-[85%]">
                  <p className="text-xs text-gray-900">
                    Sure! From the main entrance, take the elevator to the 3rd floor, then follow the teal floor markings.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-stone-100">
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="bg-transparent text-xs text-gray-900 outline-none flex-1"
                  />
                  <Send className="text-amber-700 cursor-pointer w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Billing Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Bill</span>
                  <span className="font-bold text-gray-900">₹12,450</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Insurance Covered</span>
                  <span className="text-emerald-600 font-bold">₹10,000</span>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-stone-200 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Your Responsibility</span>
                  <span className="text-xl font-bold text-amber-900">₹2,450</span>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-900 to-amber-700 py-3 rounded-full text-white font-bold text-sm shadow-lg shadow-amber-700/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Pay Now
                </button>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-stone-100 shadow-sm">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Hospital Information</h3>

              <div className="space-y-5">
                {[
                  { icon: Clock, title: 'Visiting Hours', desc: '10:00 AM - 12:00 PM | 4:00 PM - 7:00 PM' },
                  { icon: Pill, title: 'Pharmacy', desc: 'Open 24/7 • Orange Zone' },
                  { icon: Wifi, title: 'Guest Wi-Fi', desc: 'Aether_Guest | PWD: healing2024' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <Icon className="text-amber-800 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/50 border-t border-stone-200 mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold text-amber-900">AetherHealth.</span>
            <span className="text-stone-600 ml-2">Your Sanctuary for Healing.</span>
          </div>

          <div className="flex gap-8">
            <a className="text-stone-600 hover:text-amber-600 transition-colors text-sm cursor-pointer">Privacy Policy</a>
            <a className="text-stone-600 hover:text-amber-600 transition-colors text-sm cursor-pointer">Accessibility</a>
            <a className="text-stone-600 hover:text-amber-600 transition-colors text-sm cursor-pointer">Contact Support</a>
          </div>

          <div className="text-stone-500 text-xs">© 2024 AetherHealth. Connected to Secure Health Nodes.</div>
        </div>
      </footer>
    </div>
  );
}
