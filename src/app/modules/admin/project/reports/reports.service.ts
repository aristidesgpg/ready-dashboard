import { Injectable } from "@angular/core";
import { AuthService } from "../../../../core/auth/auth.service";

@Injectable({
    providedIn: 'root'
})

export class ReportsService {
    constructor(
        private readonly _authService: AuthService,
    ) { }

    public async getAllReports(projectId: string): Promise<any[]> {
        const data = { projectId: projectId };

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('betaTest-getAllReportsDev');

        return post(data).then(response => {
            return JSON.parse(response.data.response)
        });
    }
}
