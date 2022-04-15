import { Book, Publisher, Rental, User } from "../../interfaces/ResponseAPI";

interface DeleteProps {
  onClose: () => void;
  action: () => void;
}
export const DeleteConfirm = ({ action, onClose }: DeleteProps) => {
  return (
    <div>
      <h2>Attention!</h2>
      <h3>
        Você tem certeza que deseja excluir este registro permanentemente?
      </h3>
      <div className="actions">
        <button onClick={onClose}>Sim</button>
        <button onClick={() => action()}>Não</button>
      </div>
    </div>
  );
};
