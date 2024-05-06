export enum UserMessages {
  DeleteAccountSuccess = "حساب شما با موفقیت حذف شد.",
  InvalidPassword = "رمز عبور نامعتبر می باشد.",
  AlreadyExists = "این نام کاربر یا رمز عبور از قبل وجود دارد.",
  UpdatedUserSuccess = "اطلاعات حساب شما با موفقیت بروزرسانی شد.",
  NotMongodbId = "شناسه وارد شده از mongodb نمی باشد.",
  NotFound = "کاربری پیدا نشد",
  CannotRemoveAdmin = "شما نمی توانید یک ادمین را حذف کنید، این ویژگی فقط برای super admin در دسترس است.",
  CannotRemoveSuperAdmin = "شما اجازه حذف super admin را ندارید.",
  RemovedUser = 'کاربر مورد نظر با موفقیت حذف گردید.'
}
