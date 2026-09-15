interface OptionsToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function OptionsToggle({
  isOpen,
  onToggle,
}: OptionsToggleProps) {
  return (
    <button type="button" onClick={onToggle}>
      {isOpen ? "❎ Close" : "⚙️ Options"}
    </button>
  );
}