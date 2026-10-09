export class ContactError extends Error {
  constructor(code) {
    super(code)
    this.name = 'ContactError'
    this.code = code
  }
}

export function getContactEndpoint(formId) {
  const id = typeof formId === 'string' ? formId.trim() : ''
  return /^[a-z0-9]{6,64}$/i.test(id) ? `https://formspree.io/f/${id}` : ''
}

export function validateContactFields(fields) {
  const name = typeof fields.name === 'string' ? fields.name.trim() : ''
  const email = typeof fields.email === 'string' ? fields.email.trim() : ''
  const message = typeof fields.message === 'string' ? fields.message.trim() : ''
  if (!name || name.length > 100 || /[\r\n]/.test(name)) throw new ContactError('invalid')
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ContactError('invalid')
  }
  if (!message || message.length > 3000) throw new ContactError('invalid')
  return { name, email, message }
}

export async function submitContactMessage(
  fields,
  { formId, fetchImpl = fetch, timeoutMs = 15000 },
) {
  const endpoint = getContactEndpoint(formId)
  if (!endpoint) throw new ContactError('unavailable')
  const payload = validateContactFields(fields)
  payload._gotcha = typeof fields.website === 'string' ? fields.website : ''
  payload._subject = 'Nouveau message - Portfolio Oleksii Chahinian'
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (response.status === 429) throw new ContactError('rate_limit')
    if (!response.ok) throw new ContactError('rejected')
    const result = await response.json()
    if (result?.ok !== true) throw new ContactError('rejected')
  } catch (error) {
    if (error instanceof ContactError) throw error
    throw new ContactError(controller.signal.aborted ? 'timeout' : 'network')
  } finally {
    clearTimeout(timeout)
  }
}
