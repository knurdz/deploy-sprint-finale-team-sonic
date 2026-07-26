import { FormEvent, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { contactProvider } from '../config/contactProvider';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
}

export function ContactForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
    | string
    | undefined;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!accessKey) {
      setSubmissionState('error');
      setMessage('Contact service is not configured for this build.');
      return;
    }

    setSubmissionState('sending');
    setMessage('Sending your message...');

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', accessKey);
    formData.append('subject', 'Deploy Sprint support request');
    formData.append('from_name', 'Team Sonic Virtual LMS');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'The message could not be sent.');
      }

      form.reset();
      setSubmissionState('success');
      setMessage('Your support request was sent successfully.');
    } catch (error) {
      setSubmissionState('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'The message could not be sent. Please try again.',
      );
    }
  }

  return (
    <section className="panel contactPanel" id="contact">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Support</p>
          <h2>Contact the learning team</h2>
        </div>

        <div className="providerBadge">
          <Mail size={16} />
          <span>
            {contactProvider.provider} · {contactProvider.task}
          </span>
        </div>
      </div>

      <p className="contactIntro">
        Send a support request about courses, deadlines, access, or the
        learning dashboard.
      </p>

      <form className="contactForm" onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="botcheck"
          className="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="contactFieldGrid">
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
        </div>

        <label>
          Subject
          <input
            type="text"
            name="support_topic"
            placeholder="What do you need help with?"
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows={6}
            placeholder="Describe your question or issue"
            required
          />
        </label>

        <div className="contactActions">
          <button
            type="submit"
            className="contactSubmit"
            disabled={submissionState === 'sending'}
          >
            <Send size={18} />
            {submissionState === 'sending' ? 'Sending...' : 'Send request'}
          </button>

          <span
            className={`contactStatus ${submissionState}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </span>
        </div>
      </form>

      <p className="providerStatus">
        Provider configured: {contactProvider.provider}. Access key supplied
        through GitHub Secrets.
      </p>
    </section>
  );
}