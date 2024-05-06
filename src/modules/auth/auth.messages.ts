export enum AuthMessages {
  ExistingUser = "با این نام کاربری یا ایمیل از قبل ثبت نام شده است",
  RegisteredUserSuccess = "با موفقیت ثبت نام شدید",
  NotFound = "کاربری یافت نشد",
  InvalidPassword = "نام کاربری یا رمز عبور معتبر نمی باشد",
  LoginSuccess = "با موفقیت وارد شدید",
  LogoutSuccess = "با موفقیت خارج شدید",
  RequiredAccessToken = "ارسال اکسس توکن اجباری می باشد",
  CreatedNewAccessToken = "اکسس توکن جدید با موفقیت ساخته شد",
  SendLinkForResetPassword = "لینک بازنشانی رمز عبور به ایمیل تان ارسال شد لطفا ایمیل تان را بررسی کنید",
  InvalidObjectId = "آبجکت آیدی نامعتبر می باشد",
  RequiredPassword = "رمز عبور اجباری می باشد و همچنین نباید کمتر از 8 رقم باشد",
  InvalidToken = "کد ارسال شده نامعتبر می باشد",
  ResetPasswordSuccess = "رمز عبور با موفقیت بازنشانی شد",
  RequiredEmail = "ایمیل اجباری می باشد",
  SendedVerifyEmail = "ایمیلی به حساب شما ارسال شده است لطفاً بررسی کنید",
  VerifyEmailSuccess = "ایمیل شما با موفقیت تایید شد",
  AlreadyAcceptedEmail = "ایمیل شما از قبل تایید شده است",
  InvalidAccessToken = "اکسس توکن نامعتبر می باشد",
  AlreadySendEmail = "ایمیلی از قبل برای شما ارسال شده است. لطفا ایمیل تان را بررسی کنید و اگر ایمیلی دریافت نکردید 10 دقیقه دیگر اقدام به دریافت مجدد ایمیل کنید.",
  NotFoundRefreshToken = "رفرش توکن یافت نشد",
}
