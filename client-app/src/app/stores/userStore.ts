import { history } from './../../index';
import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from '../models/user';
import agent from "../api/agent";
import { RootStore } from "./rootStore";

export default class UserStore { 
    rootSrore: RootStore;
	constructor(rootSore: RootStore) { 
		this.rootSrore = rootSore;
	}
    
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user };

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            
            runInAction(() => {
				this.user = user;
			})
            this.rootSrore.commonStore.setToken(user.token);
            this.rootSrore.modalStore.closeModal();

            history.push('/activities');
        } catch (err) { 
            throw err;
        }
    }

    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (err) { 
            console.log(err);
        }
    }

    @action logout = () => { 
        this.rootSrore.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }

    @action register = async (values: IUserFormValues) => { 
        try {
            const user = await agent.User.register(values);
            this.rootSrore.commonStore.setToken(user.token);
            this.rootSrore.modalStore.closeModal();

            history.push('/activities');
        } catch (error) { 
            throw error;
        }
    }
}

