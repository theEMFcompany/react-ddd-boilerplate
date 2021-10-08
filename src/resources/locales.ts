export enum C {
  SITE_NAME = 'Briefcart'
}
export const siteMenu = {
  pricing: 'Pricing',
  logIn: 'Log In',
  logOut: 'Log Out',
  signUp: 'Request Beta Access'
}
export const home = {
  hero: {
    CTA: 'Get Started',
    heading: ['Gather Product Requirements', 'with unrivaled ease'],
    body: `${C.SITE_NAME} helps customer driven teams collate, codify & communicate product requirements while keeping all stakeholders in perfect sync`,
    callToAction: 'Ready to unleash your team?',
    actionInputPlaceholder: 'Enter your email',
    actionSubmitLabel: 'Request Beta Access'
  }
}

export const auth = {
  tryForFree: `Try ${C.SITE_NAME} for free`,
  joinOurCommunity: `Join our community of developers, designers, product managers and content creators, crafting authentic illustrated naratives with ease`,
  acceptTerms: [
    `By clicking the “Create My Account” button, you agree to ${C.SITE_NAME}'s `,
    `terms of service`,
    ` and `,
    `privacy policy.`
  ],
  alreadyHaveAccount: [`Already have an account? `, `Login`],
  inputLabels: {
    email: 'email',
    password: 'password',
    repeatPassword: 'Repeat Password',
    createAccount: `Create my Account`,
    forgotPassword:  'Reset',
  },
  loginTitle: 'Login',
  loginAction: 'Login',
  loginFooter: ['Forgot your Password?', 'Don\'t have an account?', 'Sign Up'],
  forgotPasswordTitle: 'Forgot your Password?',
  forgotPasswordBody: 'Enter you email to reset',
  forgotPasswordExit: ['Return to ', 'Login'],
  forgotPasswordSuccessTitle: 'Your Password Reset Request was Successful',
  forgotPasswordSuccessBody: 'We\'ve sent you an email. Please follow the instructions in the email to complete the process',
  forgotPasswordErrorTitle: 'Ooops!',
  forgotPasswordErrorBody: 'Something went wrong while trying to reset your password',
  forgotPasswordErrorRetry: ['Not to worry you can ', 'try again'],
  forgotPasswordSuccessRetry: ['Didn\'t receive an email? ', 'Resend email'],
  forgotPasswordLoadingTitle: 'Resetting your password',
  forgotPasswordLoadingBody: 'this won\'t take long',
  resetPasswordTitle: 'Reset your password',
  resetPasswordBody: 'Enter your new password below',
  resetPasswordExit: ['Return to ', 'Login'],
  verifyEmailTitle: `Try ${C.SITE_NAME} for free`,
  verifyEmailBody: 'To begin, enter a valid email below.',
  verifyEmailExit: ['Already have an account? ', 'Login'],
  verifyEmailSuccessTitle: 'Please verify your email',
  verifyEmailSuccessBody: `Once you verify your email address, you and your team can get started with your free ${C.SITE_NAME} plan`,
  verifyEmailSuccessRetry: ['Didn\'t receive an email? ', 'Resend Email'],
  verifyEmailErrorTitle: 'Ooops!',
  verifyEmailErrorBody: 'Something went wrong while trying to verify your email',
  verifyEmailErrorRetry: ['Not to worry you can ', 'try again'],
  verifyEmailLoadingTitle: 'Verifying your email!',
  verifyEmailLoadingBody: 'this wont take long',
}

export const onboard = {
  userInfo: {
    title: `Welcome to ${C.SITE_NAME}!`,
    description: 'To comlete your account setup you would need to provide a unique user name to identify you by',
    form: {
      username: 'Enter your preferred user name',
      helpText: 'Think deeply about this it can\t be changed once set'
    }
  },
  accountType: {
    title: 'Which of these best describes you?',
    description: 'This helps us customise your experience',
    form: {
      accoutType: '',
    }

  },
  locationDetails: {
    title: 'Where are you located?',
    description: 'We\'d love need to know where you are to enable customise your experience',
    form: {
      country: 'Country',
      state: 'State',
      helpText: ''
    }
  },
  subscriptionPlan: {
    title: 'Choose your preferred plan',
    description: 'Choose a plan that best meets you needs or that of your organisation.',
    form: {
      helpText: ''
    }
  },
}
export const requirementsCollator = {
  pageTitle: 'Create new Requirements Collator',
  templateType: {
    title: 'Template',
    heading: 'What are you working on?',
    description: ''
  },
  requirementFields: {
    title: 'Requirements',
    heading: 'What info do you require?',
    description: ''
  },
  stakeholders: {
    title: 'Stakeholders',
    heading: 'Who are your stakeholders?',
    description: '',
    emailFieldLabel: 'Enter a valid email'
  }
}
export const restuarants = {
  restaurantsTitle: 'Restaurants',
  currencyLabel: 'Currency',
  ratingFrom: 'rating from',
  diners: 'diners',
  addressLabel: 'Address',
  countryLabel: 'Country',
  cityLabel: 'City',
  cuisinesLabel: 'Cuisines',
  priceRangeLabel: 'Price Range',
  singularRestaurant: 'Restaurant',
  pluralRestaurant: 'Restaurants',
  clearFilters: 'Clear all',
  filterRestaurants: 'Filter By',
  loadingFilters: 'Fetching Filters',
  loadingRestaurants: 'Fetching Restaurants',
  noResultsHeading: 'Ooops! Don\'t mean to break your heart...',
  noResultsDesc: 'but no restaurants matching Your criteria were found. Try changing your filters and searching again',
  filterCTA: 'Apply Filters',
  noFilters: 'Nothing to Show'
}
