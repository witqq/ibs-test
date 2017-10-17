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
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

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
    const isSelected = !!this.claimsStore.selected;
    return (
      <div className={claims}>
        <Button fab className="add-button"
                onClick={this.addClaim}>
          <AddIcon/>
        </Button>

        <Grid container spacing={0} className="claims-content">
          <Grid item xs={isSelected && 6 || 12} className="claims-list-container">
            <Toolbar className="header claims-list-header">
              <Typography type="title" color="inherit" className="headline">
                Реестр заявок
              </Typography>
            </Toolbar>
            {this.renderList()}
          </Grid>
          {isSelected &&
          <Grid item xs={6} className="claims-card-container" style={{width: isSelected ? undefined : 0}}>
            <Toolbar className="header claims-card-header">
              <Typography type="title" color="inherit" className="headline">
                {this.claimsStore.selected.name}
              </Typography>
            </Toolbar>
            <div className="claim-info">
              {this.renderCard()}
            </div>
          </Grid> || null}
        </Grid>
      </div>
    );
  }
}