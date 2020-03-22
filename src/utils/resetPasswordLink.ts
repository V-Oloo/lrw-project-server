
export const resetPasswordLink = async (userId: number) => {

  return `${process.env.FRONTEND_HOST}/#/authentication/create-password?userId=${userId}`;

};