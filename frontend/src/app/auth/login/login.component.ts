import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { AuthData } from "../Auth-data.model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    isLoading = false;
    private authListnerSubs: Subscription;

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authListnerSubs =this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated =>{
          this. isLoading = isAuthenticated;
        });
    }
    onLogin(form: NgForm) {
        console.log(form.value);
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        const auth: AuthData = {
            email: form.value.email,
            password: form.value.password,
        };

        this.authService.login(auth);
    }
      ngOnDestroy() {
        this.authListnerSubs.unsubscribe();
      }
}
