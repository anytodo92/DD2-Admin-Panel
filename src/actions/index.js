import { axiosCatIns, axiosApiIns } from '../modules/axios'

export const loadCatFacts = async () => {
  return await axiosCatIns.get('facts/random?animal_type=cat&amount=23');
}
