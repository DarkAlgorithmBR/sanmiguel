import { Comment, LandingPageConfig } from './types';

export const INITIAL_CONFIG: LandingPageConfig = {
  headline: "Regardez La Vidéo Ci-Dessous Pour Écouter La Prière Des 12 Mots Divins Qui Débloque L'Abondance (Et Manifestez Dès Aujourd'hui)",
  subheadline: "",
  urgencyBannerText: "ATTENTION : Cette vidéo sera disponible uniquement jusqu'au",
  urgencyHours: 24,
  vslType: 'simulated',
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-serene-temple-architecture-with-sculptures-40916-large.mp4", // A beautiful high-quality spiritual video
  embedCode: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  buttonText: "JE VEUX ACCÉDER À LA PRIÈRE SACRÉE MAINTENANT",
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
    author: 'Père Antoine Garola',
    username: 'antoine.garola',
    rating: 5,
    content: "La prière sacrée des 12 Mots Divins est l'une des expériences spirituelles les plus puissantes que j'ai vécues.",
    timestamp: 'Il y a 4 minutes',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c2',
    author: 'Père Jean Obregón',
    username: 'jean.obregon',
    rating: 5,
    content: "J'ai vécu ce que raconte cette vidéo. La prière sacrée des 12 Mots Divins m'a aidé à trouver la paix intérieure et l'abondance spirituelle.",
    timestamp: 'Il y a 11 minutes',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c3',
    author: 'Jean-Pierre',
    username: 'jeanpierre',
    rating: 5,
    content: "La prière a commencé et une lumière a inondé ma chambre. C'était magnifique. J'ai vraiment senti une présence divine.",
    timestamp: 'Il y a 24 minutes',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c4',
    author: 'Patricia Chevalier',
    username: 'patricia.chevalier',
    rating: 5,
    content: "Mon mari a retrouvé du travail après avoir récité la prière 7 jours de suite. Dieu est grand et écoute nos prières.",
    timestamp: 'Il y a 42 minutes',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c5',
    author: 'Marie Nunez',
    username: 'marie.nunez',
    rating: 5,
    content: "Est-ce que quelqu'un d'autre se réveille à 3h du matin pour prier ? Moi oui. La paix qu'on ressent à cette heure avec cette prière est inégalable.",
    timestamp: 'Il y a 1 heure',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c6',
    author: 'Richard Dupont',
    username: 'richard.dupont',
    rating: 5,
    content: "J'ai ressenti une énergie différente pendant la prière d'hier. Expérience incroyable. Je la recommande à tous mes frères et sœurs dans la foi.",
    timestamp: 'Il y a 2 heures',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c7',
    author: 'Claire Martin',
    username: 'claire_m75',
    rating: 5,
    content: "J'ai écouté la prière ce matin en me réveillant. Une sensation immédiate d'apaisement et de clarté. Merci du fond du cœur pour ce partage sacré.",
    timestamp: 'Il y a 3 heures',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c8',
    author: 'Michel Bernard',
    username: 'michel.b',
    rating: 5,
    content: "Au début j'étais un peu sceptique, mais après 3 jours de prière constante, les choses ont commencé à se débloquer financièrement de manière inattendue.",
    timestamp: 'Il y a 5 heures',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c9',
    author: 'Sophie Lefebvre',
    username: 'sophie_92',
    rating: 5,
    content: "Une véritable bénédiction pour ma famille. La paix est revenue dans notre foyer dès la première écoute. Merci infiniment !",
    timestamp: 'Il y a 7 heures',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'c10',
    author: 'Marc Laurent',
    username: 'marclaurent34',
    rating: 5,
    content: "Les 12 Mots Divins m'ont redonné l'espoir quand tout semblait bloqué. Ma foi est plus forte que jamais.",
    timestamp: 'Il y a 12 heures',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  }
];
