import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model'; 
import { By } from '@angular/platform-browser';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  mockProductService = jasmine.createSpyObj(ProductService.name, ['getAllProducts']);
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers :[
      { provide: ProductService, useValue: mockProductService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    mockProductService.getAllProducts.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    
  });
it ('should return list',()=>{
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', brand: 'Brand A', size: 'L', price: 10, stock: 100 },
    { id: 2, name: 'Product 2', brand: 'Brand B', size: 'M', price: 20, stock: 50 }
  ];
  mockProductService.getAllProducts.and.returnValue(of(mockProducts));
  fixture.detectChanges();
    const productElements = fixture.debugElement.queryAll(By.css('span[id^="product"]'));
    expect(productElements.length).toBe(2);
    expect(productElements[0].nativeElement.textContent.trim()).toContain('Product 1');
    expect(productElements[1].nativeElement.textContent.trim()).toContain('Product 2');
})
});
