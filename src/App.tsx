import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Calendar, CheckCircle2, FileText, MapPin, Globe, Mail, Award, ArrowRight, BookOpen, AlertCircle, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import studentsData from './data.json';
import logoSekolah from './logo.png';

interface StudentData {
  nisn: string;
  nama: string;
  keterangan: string;
}

export default function App() {
  const [nisn, setNisn] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<'success' | 'not_found' | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentData | null>(null);

  // Countdown State
  const TARGET_DATE = new Date("2026-05-04T21:00:00+08:00").getTime();
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setIsOpened(true);
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        setIsOpened(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nisn.trim()) return;
    
    setIsSearching(true);
    setResult(null);
    setStudentInfo(null);
    
    // Simulate API call to show loading state
    setTimeout(() => {
      setIsSearching(false);
      
      const foundStudent = studentsData.find(student => student.nisn === nisn);
      
      if (foundStudent) {
         setStudentInfo(foundStudent as StudentData);
         setResult('success');
      } else {
         setResult('not_found');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden border border-slate-100 flex-shrink-0">
              <img src={logoSekolah} alt="Logo SMAN 6 Sigi" className="w-full h-full object-contain p-0.5 sm:p-1" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight text-slate-900 line-clamp-1">SMA Negeri 6 Sigi</h1>
              <p className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Prov. Sulawesi Tengah</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#pengumuman" className="hover:text-indigo-600 transition-colors">Pengumuman</a>
            <a href="#informasi" className="hover:text-indigo-600 transition-colors">Informasi</a>
            <a href="#kontak" className="hover:text-indigo-600 transition-colors">Kontak</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
           <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
                 </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
           </svg>
        </div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-medium mb-6">
              <Award size={16} /> Angkatan 2025/2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              Pengumuman Kelulusan <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">
                Siswa Kelas XII
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg lg:text-xl font-light mb-10 px-2 sm:px-0">
              Selamat datang di portal resmi pengumuman kelulusan SMA Negeri 6 Sigi. Silakan periksa status kelulusan Anda dengan memasukkan NISN.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Checker Section (Overlaps Hero) */}
      <section id="pengumuman" className="relative z-20 -mt-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-5 sm:p-10"
        >
          {isOpened ? (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Cek Status Kelulusan</h3>
                <p className="text-sm text-slate-500">Masukkan Nomor Induk Siswa Nasional (NISN) Anda yang terdiri dari 10 digit.</p>
              </div>

              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative flex items-center mb-4">
                  <div className="absolute left-4 text-slate-400">
                    <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={10}
                    placeholder="Contoh: 1234567890" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-lg"
                    disabled={isSearching}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSearching || nisn.length < 5}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Periksa Kelulusan <ArrowRight size={18} /></>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Gunakan NISN <b>0085384441</b> untuk mencoba demo lulus.
                </p>
              </form>

              {/* Results Area */}
              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    {result === 'success' ? (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-emerald-800 mb-2">SELAMAT! ANDA LULUS</h4>
                        <p className="text-emerald-600 text-sm mb-4">
                          Berdasarkan hasil rapat pleno dewan guru, Anda dinyatakan memenuhi syarat kelulusan SMA Negeri 6 Sigi.
                        </p>
                        <div className="bg-white rounded-xl p-4 text-left text-sm border border-emerald-100/50 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100">
                              <span className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-0">NISN</span>
                              <span className="font-mono font-semibold text-slate-800 text-base">{studentInfo?.nisn}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 mt-2 sm:mt-0">
                              <span className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-0">Nama Siswa</span>
                              <span className="font-semibold text-slate-800 text-base uppercase">{studentInfo?.nama}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 last:border-0 mt-2 sm:mt-0">
                              <span className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-0">Keterangan</span>
                              <span className="font-bold text-emerald-600 text-base">{studentInfo?.keterangan.toUpperCase()}</span>
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertCircle size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-red-800 mb-2">Data Tidak Ditemukan</h4>
                        <p className="text-red-600 text-sm">
                          NISN yang Anda masukkan tidak valid atau belum terdaftar. Pastikan NISN diketik dengan benar, atau hubungi wali kelas/tata usaha sekolah untuk informasi lebih lanjut.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="text-center py-4 sm:py-8">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                <Lock size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Pengumuman Belum Dibuka</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                Akses untuk mengecek status kelulusan akan dibuka secara serentak pada <br className="hidden sm:block" />
                <b className="text-slate-700">4 Mei 2026 pukul 21.00 WITA</b>.
              </p>
              
              {timeLeft && (
                  <div className="flex justify-center gap-3 sm:gap-6">
                    <TimeBox value={timeLeft.days} label="Hari" />
                    <TimeBox value={timeLeft.hours} label="Jam" />
                    <TimeBox value={timeLeft.minutes} label="Menit" />
                    <TimeBox value={timeLeft.seconds} label="Detik" />
                  </div>
              )}
            </div>
          )}
        </motion.div>
      </section>

      {/* Principal Message Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col relative px-8 py-12 sm:px-12 sm:py-16 text-center shadow-sm">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-50 rounded-full blur-2xl"></div>
             
             <QuoteIcon className="w-12 h-12 text-indigo-200 mx-auto mb-6 relative z-10" />
             <p className="font-serif text-xl sm:text-2xl text-slate-700 leading-relaxed mb-8 italic relative z-10">
               "Kelulusan ini bukanlah garis akhir, melainkan gerbang awal menuju pendewasaan dan masa depan yang penuh tantangan. Jadilah alumni SMA Negeri 6 Sigi yang membawa kebanggaan, menjaga akhlak mulia, dan tak pernah berhenti belajar dimana pun kalian berada."
             </p>
             <div className="relative z-10">
                <h4 className="font-bold text-lg text-slate-900">Muhammad Sintur, S.Pd., M.Pd.</h4>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Kepala SMA Negeri 6 Sigi</p>
             </div>
          </div>
        </div>
      </section>

      {/* Information & Timeline */}
      <section id="informasi" className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="font-bold text-3xl text-slate-900 mb-4">Informasi Penting Pascakelulusan</h2>
               <p className="text-slate-500 max-w-2xl mx-auto">
                 Langkah-langkah yang perlu diperhatikan oleh seluruh siswa kelas XII yang telah dinyatakan lulus dari SMAN 6 Sigi.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                     <FileText size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Penerbitan SKL</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                     Surat Keterangan Lulus (SKL) sementara dapat diambil di ruang Tata Usaha mulai tanggal yang telah ditentukan, dengan syarat mengembalikan seluruh buku perpustakaan.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg w-fit">
                     <Calendar size={14} /> 10 Mei 2026
                  </div>
               </div>

               {/* Card 2 */}
               <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                     <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Cap Tiga Jari Ijazah</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                     Jadwal cap tiga jari ijazah asli akan diinformasikan kemudian melalui grup WhatsApp wali kelas masing-masing. Wajib menggunakan pakaian seragam sekolah.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg w-fit">
                     <Calendar size={14} /> Menunggu Informasi
                  </div>
               </div>

               {/* Card 3 */}
               <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                     <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">Legalisir Dokumen</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                     Pelayanan legalisir rapor, SKL, dan Ijazah dilakukan setiap jam kerja operasional sekolah. Mohon membawa map khusus dan fotokopi dokumen secukupnya.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-2 rounded-lg w-fit">
                     <Calendar size={14} /> Senin - Jumat
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
               <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden">
                      <img src={logoImage} alt="Logo SMAN 6 Sigi" className="w-full h-full object-contain p-1" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-white">SMA Negeri 6 Sigi</h2>
                      <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Provinsi Sulawesi Tengah</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                     Lembaga pendidikan menengah atas yang berdedikasi untuk mencetak generasi cerdas, berkarakter, dan siap menghadapi tantangan masa depan.
                  </p>
               </div>
               
               <div>
                  <h4 className="text-white font-semibold mb-6">Kontak Sekolah</h4>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-3">
                        <MapPin size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-400 leading-tight">
                           Jl. Tadulako, Desa Ampera, Kecamatan Palolo, Kabupaten Sigi, Sulawesi Tengah
                        </span>
                     </li>
                     <li className="flex items-center gap-3">
                        <Globe size={18} className="text-indigo-400 shrink-0" />
                        <a href="https://sman6sigi.sch.id" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors">sman6sigi.sch.id</a>
                     </li>
                     <li className="flex items-center gap-3">
                        <Mail size={18} className="text-indigo-400 shrink-0" />
                        <a href="mailto:smansa.palolo@yahoo.co.id" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors">smansa.palolo@yahoo.co.id</a>
                     </li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-white font-semibold mb-6">Tautan Penting</h4>
                  <ul className="space-y-3">
                     <li><a href="https://kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors">Portal Kemendikdasmen</a></li>
                     <li><a href="https://disdik.sultengprov.go.id/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors">Dinas Pendidikan Provinsi Sulawesi Tengah</a></li>
                     <li><a href="https://nisn.data.kemdikbud.go.id" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-300 transition-colors">Cek NISN Online</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-sm text-slate-500">
                  &copy; {new Date().getFullYear()} Tim IT SMA Negeri 6 Sigi. All rights reserved.
               </p>
               <div className="flex gap-4">
                  <a href="https://www.facebook.com/sman6sigi/?locale=id_ID" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">Facebook</a>
                  <a href="https://www.instagram.com/sman6sigi_official?igsh=MTJ1d3VhMmR1bDM1bA==" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">Instagram</a>
                  <a href="https://youtube.com/@smanegeri6sigi?si=XSjJFOsWY7EZ3Bb3" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">YouTube</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function TimeBox({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center">
       <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 border border-indigo-100/50 rounded-2xl flex items-center justify-center mb-2 sm:mb-3 shadow-sm">
          <span className="text-2xl sm:text-3xl font-bold text-indigo-600 font-mono">
             {value.toString().padStart(2, '0')}
          </span>
       </div>
       <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}
