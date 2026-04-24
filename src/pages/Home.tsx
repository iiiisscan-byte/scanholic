import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    title: '오래되고 찾기 어려운 대량의 보관문서',
    subtitle: '디지털화를 통해 기업 경쟁력을 제고 하십시오 !'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80',
    title: '최대 A0 사이즈의 대형 도면과 그림',
    subtitle: '정밀 도면과 대형 그림을 원본 수준의 고화질로 복원합니다.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    title: '개인과 기업의 기록유산인 사진과 필름',
    subtitle: '디지털화를 통해 영구히 보존할 수 있습니다.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    title: '의료 및 산업현장의 각종 방사선 필름',
    subtitle: '정밀 판독과 AI 딥러닝을 위해 필수적인 기초 데이터입니다.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
    title: '연구기관 및 식물원의 생물표본',
    subtitle: '학술연구 및 생태정보 환경 구축의 필수 데이터입니다.'
  }
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contents, setContents] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dynamicSlides = contents ? [
    {
      id: 1,
      image: contents.hero_slide_1_image || heroSlides[0].image,
      title: contents.hero_slide_1_title || heroSlides[0].title,
      subtitle: contents.hero_slide_1_subtitle || heroSlides[0].subtitle
    },
    {
      id: 2,
      image: contents.hero_slide_2_image || heroSlides[1].image,
      title: contents.hero_slide_2_title || heroSlides[1].title,
      subtitle: contents.hero_slide_2_subtitle || heroSlides[1].subtitle
    },
    {
      id: 3,
      image: contents.hero_slide_3_image || heroSlides[2].image,
      title: contents.hero_slide_3_title || heroSlides[2].title,
      subtitle: contents.hero_slide_3_subtitle || heroSlides[2].subtitle
    },
    {
      id: 4,
      image: contents.hero_slide_4_image || heroSlides[3].image,
      title: contents.hero_slide_4_title || heroSlides[3].title,
      subtitle: contents.hero_slide_4_subtitle || heroSlides[3].subtitle
    },
    {
      id: 5,
      image: contents.hero_slide_5_image || heroSlides[4].image,
      title: contents.hero_slide_5_title || heroSlides[4].title,
      subtitle: contents.hero_slide_5_subtitle || heroSlides[4].subtitle
    }
  ] : heroSlides;

  useEffect(() => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request Timeout')), 10000)
    );

    Promise.race([
      Promise.all([
        fetch('/api/contents').then(res => res.json()),
        fetch('/api/services').then(res => res.json())
      ]),
      timeoutPromise
    ])
    .then(([contentsData, servicesData]: any) => {
      setContents(contentsData);
      setServices(servicesData);
      setIsLoading(false);
    }).catch(err => {
      console.error('Failed to fetch home data:', err);
      setIsLoading(false);
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [dynamicSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % dynamicSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + dynamicSlides.length) % dynamicSlides.length);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-neutral-900/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <img
                src={dynamicSlides[currentSlide].image}
                alt={dynamicSlides[currentSlide].title}
                className="w-full h-full object-cover transition-opacity duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80';
                }}
              />
            </div>
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-5xl"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-2xl whitespace-pre-line leading-[1.1]">
                  {dynamicSlides[currentSlide].title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto font-medium drop-shadow-lg leading-relaxed opacity-90">
                  {dynamicSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {dynamicSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section - 내용 유지 */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
            아날로그의 가치를<br />디지털로 영원하게
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-12 break-keep whitespace-pre-line">
            {contents?.about_text || `스캔홀릭은 최고급 전문 스캐너 장비와 독자적인 이미지 처리 기술을 바탕으로,
            기업과 개인의 중요한 자산을 가장 안전하고 완벽하게 디지털화합니다.
            단순한 스캔을 넘어 데이터의 활용 가치를 극대화하는 솔루션을 제공합니다.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { title: '최고급 장비', desc: '고해상도 대형 스캐너 및 산업용 특수 스캐너 보유' },
            { title: '전문 인력', desc: '다년간의 노하우를 갖춘 디지털화 전문 엔지니어 투입' },
            { title: '보안 및 품질', desc: '철저한 문서보안과 품질 검수 프로세스 적용' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 tracking-tight break-keep">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview - API 호출 주소 수정 상태 유지 */}
      <section className="py-24 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 서비스</h2>
              <p className="text-gray-600">다양한 형태의 원본을 최적의 방식으로 디지털화합니다.</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(services) && services.slice(0, 4).map((service, i) => {
              const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Image;
              return (
                <Link key={service.id || i} to={`/services#service-${service.id}`} className="group relative h-80 rounded-2xl overflow-hidden block">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center text-white font-bold opacity-50 group-hover:opacity-70 transition-opacity">
                      <Icon className="w-12 h-12 mb-2" />
                      <span>{service.icon || 'No Image'}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <span className="inline-flex items-center text-sm text-white/80 group-hover:text-white transition-colors">
                    자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
