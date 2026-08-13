import {
  FaBaby,
  FaCapsules,
  FaFilePrescription,
  FaGlasses,
  FaHeartPulse,
  FaKitMedical,
  FaSprayCanSparkles,
  FaTablets
} from 'react-icons/fa6';

export const CATEGORY_ICONS = {
  prescription: FaFilePrescription,
  otc: FaCapsules,
  vitamins: FaTablets,
  baby: FaBaby,
  beauty: FaSprayCanSparkles,
  medical: FaHeartPulse,
  firstaid: FaKitMedical,
  eye: FaGlasses
};

export const CATEGORY_GRADIENTS = {
  prescription: 'from-blue-500 to-indigo-500',
  otc: 'from-emerald-500 to-teal-500',
  vitamins: 'from-amber-500 to-orange-500',
  baby: 'from-pink-500 to-rose-500',
  beauty: 'from-purple-500 to-fuchsia-500',
  medical: 'from-cyan-500 to-sky-500',
  firstaid: 'from-red-500 to-orange-500',
  eye: 'from-indigo-500 to-blue-500'
};

export const CATEGORY_ORDER = ['prescription', 'otc', 'vitamins', 'baby', 'beauty', 'medical', 'firstaid', 'eye'];
