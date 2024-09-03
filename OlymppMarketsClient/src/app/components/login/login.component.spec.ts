import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Data, Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;
  mockAuthService = jasmine.createSpyObj(AuthService.name, ['login']);
  let localStorageMock={
    setItem: (key: string, value: string) => {}
  }
  
  
  const mockLogin = {
    token: "toto"
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Storage, useValue: localStorageMock}

      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('click on login',() =>{
    spyOn(router, 'navigate');
    spyOn(localStorageMock,'setItem')
   
    mockAuthService.login.and.returnValue(of(mockLogin));
    component.username = 'testuser';
    component.password = 'testpassword';

    const buttonLogin = fixture.debugElement.query(By.css('#loginButton'));
    buttonLogin.nativeElement.click();

    expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpassword');// controle que la méthode a été appelée avec deux arguments
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'toto');
    expect(router.navigate).toHaveBeenCalledWith(['/']);


  })
  it('error on login',()=>{
    spyOn(console,'error').and.callThrough();
    const buttonLogin = fixture.debugElement.query(By.css('#loginButton'));
    mockAuthService.login.and.returnValue(throwError(()=>new HttpErrorResponse({status: 404})));
    buttonLogin.nativeElement.click();
    expect(console.error).toHaveBeenCalledWith('Login failed',jasmine.any(HttpErrorResponse));
  })
});
