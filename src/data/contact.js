export const contact = {
  email: 'alex.shaginyan0507@gmail.com',
  socials: [
    { label: 'GitHub', handle: '@Valerian0507', url: 'https://github.com/Valerian0507' },
    {
      label: 'LinkedIn',
      handle: 'in/oleksii-chahinian',
      url: 'https://www.linkedin.com/in/oleksii-chahinian',
    },
  ],
}

export function buildContactMailto({ name, email, message }) {
  const subject = `Contact portfolio - ${name.trim()}`
  const body = `${message.trim()}\r\n\r\n${name.trim()}\r\n${email.trim()}`
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
