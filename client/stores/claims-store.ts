import {types, clone, applySnapshot, getSnapshot} from "mobx-state-tree";
import {ClaimModel, claimChanged} from "./claim-model";
import {Api} from "../api/api";
import {Claim} from "../../share/data/interfaces/claim";
import {appStore} from "../app";

export const CLAIMS_STORE = "claimsStore";

export const ClaimsStore = types.model({
  claims: types.optional(types.array(ClaimModel), []),
  loading: types.optional(types.boolean, false),
  selectedClaimId: types.maybe(types.string),
  // копия выбранной заявки, которая отображается на форме и не меняет данные первоначальной
  selectedClaimView: types.maybe(ClaimModel)
})
  .views(self => ({
    get selected(): ClaimModel {
      return self.claims.find(claim => claim.id == self.selectedClaimId)
    }
  }))
  .views(self => ({
    get selectedChanged(): boolean {
      return claimChanged(self.selected, self.selectedClaimView);
    }
  }))
  .actions(self => ({
    setSelectedClaim(claim: ClaimModel) {
      self.selectedClaimId = claim && claim.id || undefined;
      self.selectedClaimView = claim && clone(claim) || undefined;
    }
  }))
  .actions(self => ({
      setClaims(claims: Array<Claim>) {
        self.claims.clear();
        claims.forEach(claim => self.claims.push(ClaimModel.create(claim)));
      },
      onSelectClaim(claim: ClaimModel) {
        if (self.loading) {
          return;
        }
        if (self.selectedChanged) {
          return appStore.confirmStore.ask("Изменения будут потеряны, продолжить?")
            .then(res => {
              if (res) {
                self.setSelectedClaim(claim)
              }
            })
        }
        self.setSelectedClaim(claim);
      },
      afterSelectedSave(isNew: boolean, saved: Claim) {
        applySnapshot(self.selected, saved);
        self.loading = false;
      }
    })
  ).actions(self => ({
      load: () => {
        Api.getClaims().then(claims => self.setClaims(claims))
      },
      saveSelected() {
        if (!self.selectedChanged) {
          return;
        }
        self.loading = true;
        const claim = self.selectedClaimView;
        const isNew = !claim.id;
        Api.saveClaim(getSnapshot(claim)).then(res => self.afterSelectedSave(isNew, res))
      }
    })
  );

export type ClaimsStore = typeof ClaimsStore.Type;