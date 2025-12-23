interface InputProps {
  type?: "text" | "mail" | "password"
  label?: string;
  placeholder?: string;
}

export default function Input({type, label, placeholder }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-zinc-800 text-sm">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="border border-slate-300 px-3 py-3 rounded-lg text-sm focus:border-blue-500 focus:outline focus:outline-blue-500 
        invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:outline-red-500 transition-colors"
      />
    </div>
  );
}
