<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import { contact } from '@/data/contact.js'
import { reactive, ref } from 'vue'
import { submitContactMessage } from '@/services/contact_service.js'

const { t } = useI18n({ useScope: 'global' })

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || ''

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({ name: '', email: '', message: '', website: '' })

async function sendMessage() {
  if (isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await submitContactMessage(form, { formId })

    successMessage.value = 'contact.success'
    Object.assign(form, { name: '', email: '', message: '', website: '' })
  } catch {
    errorMessage.value = 'contact.error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="container contact_page">
    <section class="contact_intro" aria-labelledby="contact_title">
      <p class="contact_kicker">// {{ t('contact.kicker') }}</p>
      <h1 id="contact_title">{{ t('contact.title') }}</h1>
      <p class="contact_description">
        {{ t('contact.description') }}
      </p>
      <a class="contact_email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>

      <ul class="contact_socials" :aria-label="t('contact.socials')">
        <li v-for="social in contact.socials" :key="social.label">
          <a :href="social.url" target="_blank" rel="noopener noreferrer">
            <span>{{ social.label }}</span>
            <span class="contact_social_handle">
              {{ social.handle }} <ArrowUpRight :size="16" aria-hidden="true" />
            </span>
          </a>
        </li>
      </ul>
    </section>

    <section class="contact_form_panel" aria-labelledby="contact_form_title">
      <form class="contact_form" @submit.prevent="sendMessage">
        <h2 id="contact_form_title">// {{ t('contact.form_title') }}</h2>
        <label class="contact_honeypot" aria-hidden="true">
          {{ t('contact.website') }}
          <input v-model="form.website" name="_gotcha" tabindex="-1" autocomplete="off" />
        </label>
        <label for="contact_name">
          {{ t('contact.name') }}
          <input
            id="contact_name"
            v-model="form.name"
            name="name"
            autocomplete="name"
            :placeholder="t('contact.name_placeholder')"
            maxlength="100"
            pattern=".*\S.*"
            required
          />
        </label>
        <label for="contact_email">
          {{ t('contact.email') }}
          <input
            id="contact_email"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            :placeholder="t('contact.email_placeholder')"
            maxlength="254"
            required
          />
        </label>
        <label for="contact_message">
          {{ t('contact.message') }}
          <textarea
            id="contact_message"
            v-model="form.message"
            name="message"
            :placeholder="t('contact.message_placeholder')"
            rows="5"
            maxlength="3000"
            required
          ></textarea>
        </label>
        <p id="contact_form_help" class="contact_form_help">
          {{ t('contact.help') }}
        </p>
        <button type="submit" :disabled="isSubmitting" aria-describedby="contact_form_help">
          {{ t(isSubmitting ? 'contact.sending' : 'contact.send') }}
          <ArrowRight :size="16" aria-hidden="true" />
        </button>
        <p v-if="successMessage" role="status">{{ t(successMessage) }}</p>
        <p v-if="errorMessage" role="alert">{{ t(errorMessage) }}</p>
      </form>
    </section>
  </main>
</template>

<style scoped lang="scss">
.contact_page {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 4rem;
  padding-block: 5.5rem 6.25rem;
}
.contact_intro {
  min-width: 0;
  h1 {
    margin: 0 0 1.375rem;
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.05;
  }
}
.contact_kicker {
  margin: 0 0 1rem;
  color: var(--color-accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}
.contact_description {
  max-width: 26.25rem;
  margin: 0 0 1.875rem;
  color: var(--color-muted);
  font-size: 1.0625rem;
  line-height: 1.65;
}
.contact_email {
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2vw, 1.5rem);
  overflow-wrap: anywhere;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.contact_socials {
  margin: 2.125rem 0 0;
  padding: 0;
  border-bottom: 1px solid var(--color-border);
  list-style: none;
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 0.875rem;
    border-top: 1px solid var(--color-border);
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    text-decoration: none;
    &:hover,
    &:focus-visible {
      color: var(--color-accent-ink);
      .contact_social_handle {
        color: inherit;
      }
    }
  }
}
.contact_social_handle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  color: var(--color-muted);
  overflow-wrap: anywhere;
  text-align: right;
  svg {
    flex-shrink: 0;
  }
}
.contact_form_panel {
  min-width: 0;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background-color: var(--color-surface);
}
.contact_form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  h2,
  label {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  h2 {
    margin: 0;
    color: var(--color-muted);
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.4375rem;
    color: var(--color-text);
  }
  input,
  textarea {
    width: 100%;
    min-width: 0;
    padding: 0.75rem 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.9375rem;
    line-height: 1.5;
    letter-spacing: normal;
    text-transform: none;
    &::placeholder {
      color: var(--color-muted);
    }
    &:focus-visible {
      border-color: var(--color-accent-ink);
    }
  }
  textarea {
    resize: vertical;
    min-height: 8rem;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 2.75rem;
    padding: 0.875rem;
    border: 1px solid var(--color-accent);
    border-radius: 0.5625rem;
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: color-mix(in srgb, var(--color-accent) 90%, white);
    }
  }
}
.contact_form_help,
.contact_form_status {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.contact_form_help {
  color: var(--color-muted);
}
.contact_form_status {
  color: var(--color-text);
}
@media (max-width: 58rem) {
  .contact_page {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.5rem;
    padding-block: 3rem 4rem;
  }
  .contact_intro h1 {
    max-width: 38rem;
    font-size: clamp(2.25rem, 6vw, 3.5rem);
  }
  .contact_email {
    font-size: 1.25rem;
  }
}
@media (max-width: 30rem) {
  .contact_form_panel {
    padding: 1.25rem;
  }
  .contact_socials a {
    gap: 0.5rem;
    font-size: 0.75rem;
  }
}

.contact_form .contact_honeypot {
  display: none;
}
</style>
