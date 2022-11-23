export const fullnameValidator = (value: string) => {
  return !!(value && value?.split(' ').length > 1 && value?.replace(/\s/g,'').length > 3)
}

export const emailValidator = (value: string) => {
  return !!(value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}

export const countryValidator = (value: string) => {
  return !!(value && value?.replace(/\s/g,'').length > 2)
}

export const cityValidator = (value: string) => {
  return !!(value && value?.replace(/\s/g,'').length > 2)
}

export const streetValidator = (value: string) => {
  return !!(value && value?.replace(/\s/g,'').length > 2 && /^\d+\.?\d*$/.test(value.slice(-1)))
}

export const titleValidator =(value: string) => {
  return !!(value && value?.length > 1)
}

export const pictureValidator=(value: string) => {
  return !!(value && /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(value))
}