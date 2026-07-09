import React, { useState } from 'react';
import { Star, Check, Send, Sparkles, MessageCircle, Trash2 } from 'lucide-react';
import { Comment } from '../types';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  onDeleteComment?: (id: string) => void;
}

export default function CommentsSection({ comments, onAddComment, onDeleteComment }: CommentsSectionProps) {
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    onAddComment({
      author: newCommentAuthor.trim(),
      username: newCommentAuthor.toLowerCase().replace(/\s+/g, '.'),
      rating: newCommentRating,
      content: newCommentText.trim(),
      isVerified: true
    });

    setNewCommentAuthor('');
    setNewCommentText('');
    setNewCommentRating(5);
    setIsFormOpen(false);
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6" id="comments-wrapper">
      
      {/* Title & Stats */}
      <div className="text-center space-y-3">
        <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-wide">
          Comentarios
        </h3>
        
        {/* Mostrando stats block exact to screenshot */}
        <div className="inline-block px-4 py-1.5 bg-[#fef0cd] text-slate-900 rounded-md text-xs font-bold font-sans">
          Mostrando 18 de 322 comentarios
        </div>
      </div>

      {/* Testimonial List matching visual design precisely */}
      <div className="space-y-4" id="testimonials-list">
        {comments.map((comment) => (
          <div 
            key={comment.id}
            className="p-5 bg-[#0a1128] border border-slate-800/60 rounded-xl flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:space-x-4 transition-all hover:border-amber-500/10 shadow-lg text-left"
          >
            {/* Avatar block */}
            <div className="flex-shrink-0 relative">
              {comment.avatarUrl ? (
                <img 
                  src={comment.avatarUrl} 
                  alt={comment.author} 
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/20"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 text-slate-950 font-bold flex items-center justify-center text-sm border border-amber-500/20 uppercase">
                  {comment.author.slice(0, 2)}
                </div>
              )}
              {comment.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-[#0a1128]">
                  <Check className="w-2.5 h-2.5 stroke-[4px]" />
                </span>
              )}
            </div>

            {/* Testimonial content */}
            <div className="flex-1 space-y-1.5 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-bold text-slate-100 text-sm md:text-base tracking-wide block">
                    {comment.author}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    @{comment.username}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-0.5 sm:mt-0">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {comment.timestamp}
                  </span>
                  {onDeleteComment && (
                    <button
                      onClick={() => {
                        if (window.confirm('¿Está seguro de que desea eliminar este testimonio?')) {
                          onDeleteComment(comment.id);
                        }
                      }}
                      className="p-1 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded transition-all cursor-pointer"
                      title="Eliminar testimonio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 5 stars block exactly like screenshot */}
              <div className="flex items-center space-x-0.5 text-[#ffc107]">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 fill-current ${i < comment.rating ? 'text-amber-400' : 'text-slate-700'}`} 
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-300 text-sm leading-relaxed pt-1 select-text font-sans">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Button to show write review form */}
      <div className="text-center pt-2">
        {!isFormOpen ? (
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center space-x-2 py-2.5 px-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>¿Quieres dejar tu testimonio? Escribir comentario</span>
          </button>
        ) : (
          <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-left space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-extrabold uppercase text-amber-400 tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Escribe tu Testimonio</span>
              </h4>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-xs text-slate-500 hover:text-white"
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Tu Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="Ej. Sofia Mendes"
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-medium">Calificación (Estrellas)</label>
                  <select
                    value={newCommentRating}
                    onChange={(e) => setNewCommentRating(parseInt(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (Excelente)</option>
                    <option value={4}>⭐⭐⭐⭐ (Muy Bueno)</option>
                    <option value={3}>⭐⭐⭐ (Bueno)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Tu Testimonio / Experiencia</label>
                <textarea
                  required
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Comparte cómo te ha ayudado esta frecuencia o canto espiritual..."
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Comentario</span>
              </button>
            </form>
          </div>
        )}

        {commentSuccess && (
          <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl inline-block font-medium animate-pulse">
            ¡Testimonio enviado con éxito! Se mostrará en la lista ahora.
          </div>
        )}
      </div>

    </div>
  );
}
