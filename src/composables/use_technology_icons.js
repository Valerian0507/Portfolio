import { computed } from 'vue'
import { useTheme } from '@/composables/use_theme.js'
import phpIcon from '@/assets/icons/technologies/php.svg'
import symfonyLightIcon from '@/assets/icons/technologies/symfonylight.svg'
import symfonyDarkIcon from '@/assets/icons/technologies/symfonydark.svg'
import doctrineIcon from '@/assets/icons/technologies/doctrine.svg'
import mysqlIcon from '@/assets/icons/technologies/mysql.svg'
import stripeWhiteIcon from '@/assets/icons/technologies/stripe.svg'
import stripePurpleIcon from '@/assets/icons/technologies/stripe_purple.svg'
import reactNativeIcon from '@/assets/icons/technologies/reactnative.svg'
import dockerIcon from '@/assets/icons/technologies/docker.svg'
import twigIcon from '@/assets/icons/technologies/twig.svg'
import javascriptIcon from '@/assets/icons/technologies/javascript.svg'
import bootstrapIcon from '@/assets/icons/technologies/bootstrap.svg'
import expoIcon from '@/assets/icons/technologies/expo.svg'
import expoWhiteIcon from '@/assets/icons/technologies/expo_white.svg'
import apiIcon from '@/assets/icons/technologies/api.svg'
import apiWhiteIcon from '@/assets/icons/technologies/api_white.svg'

export function useTechnologyIcons() {
  const { isDark } = useTheme()
  const technologyIcons = computed(() => ({
    PHP: phpIcon,
    'REST API': isDark.value ? apiWhiteIcon : apiIcon,
    Twig: twigIcon,
    JavaScript: javascriptIcon,
    Bootstrap: bootstrapIcon,
    Symfony: isDark.value ? symfonyLightIcon : symfonyDarkIcon,
    Doctrine: doctrineIcon,
    MySQL: mysqlIcon,
    Stripe: isDark.value ? stripeWhiteIcon : stripePurpleIcon,
    'React Native': reactNativeIcon,
    Expo: isDark.value ? expoWhiteIcon : expoIcon,
    Docker: dockerIcon,
  }))

  return { technologyIcons }
}
