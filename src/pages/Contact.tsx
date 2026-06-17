import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { PROFILE_CONFIG } from "../config/profile";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    // Simulação de envio com timer
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reseta o status de sucesso após 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative overflow-hidden animate-fade-in-up">
      {/* Decorações flutuantes de fundo */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-accent/5 blur-[120px] rounded-full -z-10 animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-accent/10 blur-[150px] rounded-full -z-10 animate-drift-reverse" />

      {/* Título da página */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-8 h-0.5 bg-accent"></div>
        <span className="font-mono text-accent text-xs tracking-widest uppercase">
          03. <FormattedMessage id="contact.page.title" defaultMessage="Contact" />
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start mt-6">
        {/* Lado Esquerdo: Info de Contato */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            <FormattedMessage id="contact.title" defaultMessage="Get In Touch" />
          </h1>
          <p className="text-gray-400 leading-relaxed text-base max-w-md">
            <FormattedMessage
              id="contact.description"
              defaultMessage="Feel free to reach out if you're looking for a developer, have a question, or just want to connect."
            />
          </p>

          <div className="space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-card-bg/30 border border-white/5 hover:border-accent/30 transition-all duration-300">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Mail size={20} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                <a
                  href={`mailto:${PROFILE_CONFIG.emailContact}`}
                  className="text-white hover:text-accent font-medium transition-colors break-all block"
                >
                  {PROFILE_CONFIG.emailContact}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-card-bg/30 border border-white/5 hover:border-accent/30 transition-all duration-300">
              <div className="p-3 rounded-lg bg-accent/10 text-accent">
                <Sparkles size={20} />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Github</p>
                <a
                  href={PROFILE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent font-medium transition-colors break-all block"
                >
                  {PROFILE_CONFIG.githubUrl.replace("https://", "")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário Glassmorphism */}
        <div className="lg:col-span-3 bg-card-bg/50 backdrop-blur-md border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] rounded-full" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Campo Nome */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={12} className="text-accent" />
                  <FormattedMessage id="contact.form.name" defaultMessage="Name" />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={12} className="text-accent" />
                  <FormattedMessage id="contact.form.email" defaultMessage="Email" />
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                />
              </div>
            </div>

            {/* Campo Assunto */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare size={12} className="text-accent" />
                <FormattedMessage id="contact.form.subject" defaultMessage="Subject" />
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
              />
            </div>

            {/* Campo Mensagem */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare size={12} className="text-accent" />
                <FormattedMessage id="contact.form.message" defaultMessage="Message" />
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
              />
            </div>

            {/* Status Feedback */}
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <CheckCircle size={18} />
                <FormattedMessage id="contact.form.success" defaultMessage="Message sent successfully!" />
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                <AlertCircle size={18} />
                <FormattedMessage id="contact.form.error" defaultMessage="An error occurred. Please try again." />
              </div>
            )}

            {/* Botão de Enviar */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 bg-accent-subtle border border-accent text-accent hover:bg-accent hover:text-black font-bold py-3.5 px-6 rounded-xl transition-all hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer"
            >
              {status === "sending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent animate-spin rounded-full" />
                  <FormattedMessage id="contact.form.sending" defaultMessage="Sending..." />
                </>
              ) : (
                <>
                  <Send size={18} />
                  <FormattedMessage id="contact.form.send" defaultMessage="Send Message" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
