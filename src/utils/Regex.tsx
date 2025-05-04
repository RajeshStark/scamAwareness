export const validateEmail =
  /^([A-Za-z0-9_\-\.])+\@(?!(?:[A-Za-z0-9_\-\.]+\.)?([A-Za-z]{2,4})\.\2)([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const passwordregsm = /\w*[a-z]\w*/;
export const passwordregcap = /[A-Z]/;
export const passwordnum = /\d/;
export const passwordspl = /[!@#$%^&*()\-_~"=+{}; :,<.>]/;
export const phonenum = /[0-9]{10}$/;
export const phoneNumberregex = /^\(\d{3}\) \d{3} \d{4}$/;
export const onlyLetters = /[a-zA-Z ]+[a-zA-Z]$/;
export const displaname = /^[A-Za-z\s]*[A-Za-z][A-Za-z\s]*$/;
export const username = /^[A-Za-z0-9]+$/; ////^\w+$/;

export const emojiRegex =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
