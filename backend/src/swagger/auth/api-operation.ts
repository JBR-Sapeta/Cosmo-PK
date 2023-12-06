export const OPERATION = {
  getUsers: { description: 'Get list of active and inactive users.' },
  signUp: { description: 'Create new user account.' },
  signIn: { description: 'Log in to a user account.' },
  activateAccount: { description: 'Activate user account.' },
  whoAmI: { description: 'Get account data and refresh JWT.' },
  updateEmail: { description: 'Change email address.' },
  updatePassword: { description: 'Change password.' },
  accountRecovery: {
    description:
      'Create request to set new password and regain access to account.',
  },
  resetPassword: { description: 'Set new password using reset token.' },
  uploadUserImage: { description: 'Upload a new avatar for the user.' },
  toggleIsActive: { description: 'Toggle user isActive property.' },
  deleteAccount: { description: 'Delete account.' },
};
