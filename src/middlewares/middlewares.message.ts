export enum MiddlewaresMessages {
  //Auth middleware
  ProtectedPath = "این مسیر محافظت می شود. برای دسترسی به آن، ابتدا باید وارد شوید",
  NotFoundUser = "کاربری پیدا نشد",
  RequiredAcceptEmail = "لطفا ایمیل خود را تایید کنید تا بتوانید به این مسیر دسترسی داشته باشید",

  //IsAdmin middleware
  PathOfAdmins = 'فقط مدیران می توانند به این مسیر دسترسی داشته باشند'
}
