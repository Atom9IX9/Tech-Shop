import Catalogue from "./Catalogue";

import { useSelector } from "react-redux";
import { getDialogs } from "utils/selectors/appGlobalSelectors";
import Dialog from "components/Dialog/Dialog";
import BasketDialog from "components/Dialog/Basket";
import { TDialogsName, setDialog } from "reducers/appReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "reducers/store";

const AppDialogs = () => {
  const dialogs = useSelector(getDialogs);
  const dispatch = useAppDispatch();
  let [activeDialog, setActiveDialog] = useState<TDialogsName | null>(null);
  useEffect(() => {
    let isActiveDialog = false;
    Object.keys(dialogs).forEach((dName) => {
      if (dialogs[dName as TDialogsName]) {
        setActiveDialog(dName as TDialogsName);
        isActiveDialog = true;
      }
    });
    if (!isActiveDialog) {
      setActiveDialog(null);
    }
  }, [dialogs]);

  return (
    <>
      {activeDialog && (
        <Dialog
          close={() => {
            dispatch(
              setDialog({ name: activeDialog as TDialogsName, value: false })
            );
            setActiveDialog(null);
          }}
        >
          {(() => {
            switch (activeDialog) {
              case "basket":
                return <BasketDialog />;
              case "catalogue":
                return <Catalogue />;
              default:
                return <></>;
            }
          })()}

          {/* {activeDialog === "basket" ? (
            <BasketDialog />
          ) : activeDialog === "catalogue" ? (
            <Catalogue />
          ) : (
            ""
          )} */}
        </Dialog>
      )}
    </>
  );
};

export default AppDialogs;
