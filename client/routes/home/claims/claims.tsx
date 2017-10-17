import {ObservableComponent} from "../../../utils/mobx/ObservableComponent";
import * as React from "react";
import Grid from "material-ui/Grid";
import {claims} from "./claims.less";
import AddIcon from "material-ui-icons/Add";
import Button from "material-ui/Button";
import Table, {TableHead, TableRow, TableCell, TableBody} from "material-ui/Table";
import {injectStore} from "../../../stores/inject-store";
import {ClaimsStore, CLAIMS_STORE} from "../../../stores/claims-store";
import {ClaimCard} from "./claim-card";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import {autobind} from "core-decorators";

export class Claims extends ObservableComponent {

  @injectStore(CLAIMS_STORE)
  claimsStore: ClaimsStore;

  renderList() {
    const claimsStore = this.claimsStore;
    return (
      <div className="claims-list">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Наименование</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {claimsStore.claims.map(claim => {
              return (
                <TableRow key={claim.id}
                          onClick={() => claimsStore.onSelectClaim(claim)}
                          hover
                          selected={claimsStore.selected === claim}>
                  <TableCell>{claim.docNum}</TableCell>
                  <TableCell>{claim.name}</TableCell>
                  <TableCell>{claim.status && claim.status.name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Delete"
                                onClick={(ev) => {
                                  claimsStore.removeClaim(claim);
                                  ev.stopPropagation();
                                }}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  renderCard() {
    return (
      <ClaimCard/>
    );
  }

  @autobind
  addClaim() {
    this.claimsStore.addClaim();
  }

  render() {
    return (
      <div className={claims}>
        <Button fab className="add-button"
                onClick={this.addClaim}>
          <AddIcon/>
        </Button>
        <Grid container spacing={0} className="claims-content">
          <Grid item xs={6} className="claims-list-container">
            {this.renderList()}
          </Grid>
          <Grid item xs={6} className="claim-info">
            {this.renderCard()}
          </Grid>
        </Grid>
      </div>
    );
  }
}