import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

type Pizza = { name: string; description: string; url: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  private client = inject(HttpClient);

  pizzas: Pizza[] = [
    { name: 'Масяня Делюкс', description: 'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус чили, ананасы', url: 'images/p/1.png' },
    { name: 'Морская Преимум', description: 'Перец, сыр, креветки, кальмары, мидии, лосось', url: 'images/p/2.png' },
    { name: 'Бекон и Сосиски', description: 'Бекон, сыр, сосиски, ананас, томатная паста', url: 'images/p/3.png' },
    { name: 'Куриная Делюкс', description: 'Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста', url: 'images/p/4.png' },
    { name: 'Барбекю Премиум', description: 'Свинина BBQ, соус Барберкю, сыр, курица, соус для пиццы, соус чили', url: 'images/p/5.png' },
    { name: 'Пепперони Дабл', description: 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная', url: 'images/p/6.png' },
    { name: 'Куриное трио', description: 'Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для пиццы', url: 'images/p/7.png' },
    { name: 'Сырная', description: 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный', url: 'images/p/8.png' },
  ];

  isMenuVisible = false;

  popup = {
    visible: false,
    url: null as string | null,
    text: null as string | null
  };

  openImage(src: string): void {
    this.popup.visible = true;
    this.popup.url = src;
    this.popup.text = null;
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  send(): void {
    this.popup.visible = true;
    this.popup.text = 'Спасибо за заказ!';
    this.popup.url = null;
    this.client.get("/fake-response.json").subscribe(() => {
      interval(2000).pipe(first()).subscribe(() => window.location.reload());
    });
  }

  omitPoint(event: ClipboardEvent): void {
    if (event.clipboardData?.getData('text')?.includes('.')) event.preventDefault();
  }
}
