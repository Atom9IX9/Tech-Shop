import { useSelector } from "react-redux";
import { getDialogs } from "utils/selectors/appGlobalSelectors";
import Dialog from "components/Dialog/Dialog";
import BasketDialog from "components/Dialog/Basket";
import { TDialogsName, setDialog } from "reducers/appReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "reducers/store";

const AppDialogs = () => {
  const dialogs = useSelector(getDialogs);
  const dispatch = useAppDispatch()
  let [activeDialog, setActiveDialog] = useState<TDialogsName | null>(null);
  useEffect(() => {
    Object.keys(dialogs).forEach((dName) => {
      if (dialogs[dName as TDialogsName]) {
        setActiveDialog(dName as TDialogsName);
      }
    });
  }, [dialogs]);

  return (
    <>
      {activeDialog && (
        <Dialog
          close={() => {
            dispatch(setDialog({ name: activeDialog as TDialogsName, value: false }));
            setActiveDialog(null)
          }}
        >
          {activeDialog === "basket" ? (
            <BasketDialog />
          ) : 
            ""
          }
        </Dialog>
      )}
    </>
  );
};

export default AppDialogs;
