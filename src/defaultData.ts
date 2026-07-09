import { Comment, LandingPageConfig } from './types';

export const INITIAL_CONFIG: LandingPageConfig = {
  headline: "El Canto Sagrado de San Miguel Arcángel para manifestar en 24 horas",
  subheadline: "Activa la protección divina y abre las puertas de la prosperidad y la salud con la frecuencia milagrosa del Arcángel San Miguel.",
  urgencyBannerText: "ATENCIÓN: Este video estará disponible solo hasta el",
  urgencyHours: 24,
  vslType: 'simulated',
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-serene-temple-architecture-with-sculptures-40916-large.mp4", // A beautiful high-quality spiritual video
  embedCode: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  buttonText: "QUIERO ACCEDER AL CANTO SAGRADO AHORA",
  requirePhone: true,
  theme: 'navy',
  viewerCountStart: 609,
  formDelaySeconds: 5,
  formShowOption: 'delayed', // can be 'always', 'delayed', 'after_video'
  redirectUrl: "https://pay.hotmart.com/checkout" // sample checkout redirect
};

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Padre Heriberto Garola',
    username: 'heriberto.garola',
    rating: 5,
    content: 'El canto sagrado de San Miguel Arcángel es una de las experiencias espirituales más poderosas que he vivido.',
    timestamp: 'Hace 4 minutos',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c2',
    author: 'Padre Jorge Obregón',
    username: 'jorge.obregon',
    rating: 5,
    content: 'Viví lo que relata este video. El canto sagrado de San Miguel Arcángel me ayudó a encontrar paz interior y sanación espiritual.',
    timestamp: 'Hace 11 minutos',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c3',
    author: 'Juan Pedro',
    username: 'juanpedro',
    rating: 5,
    content: 'Comenzó la oración y una luz inundó mi cuarto. Fue hermoso. Realmente sentí una presencia sagrada.',
    timestamp: 'Hace 24 minutos',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c4',
    author: 'Patricia Lima',
    username: 'patricia.lima',
    rating: 5,
    content: 'Mi esposo volvió a trabajar después de hacer la oración 7 dias seguidos. Dios es fiel y San Miguel Arcángel intercede por nosotros.',
    timestamp: 'Hace 42 minutos',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c5',
    author: 'Maria Núñez',
    username: 'maria.nunez',
    rating: 5,
    content: '¿Hay alguien más despertándose a las 3h para orar? Yo sí. La paz que se siente a esa hora con este canto es inigualable.',
    timestamp: 'Hace 1 hora',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c6',
    author: 'Ricardo Ortega',
    username: 'ricardo.ortega',
    rating: 5,
    content: 'Sentí una energía diferente durante la oración de ayer. Increíble experiencia. Lo recomiendo a todos mis hermanos en la fe.',
    timestamp: 'Hace 2 horas',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  }
];
