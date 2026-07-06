This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# `src/components/TodoApp.tsx` izahı (sətir-sətir)

Bu komponent sadə bir Todo (iş siyahısı) tətbiqidir: todo əlavə etmək, siyahıda göstərmək və sola sürüşdürüb silmək funksionallığı var.

```
3   import React, { useState } from 'react';
```
`useState` — komponentin daxili vəziyyətini (state) saxlamaq üçün React hook-u. Hər dəfə state dəyişəndə komponent yenidən render olunur.

```
4-11  import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
```
React Native-in hazır (built-in) UI komponentləri:
- `View` — HTML-dəki `div` kimi konteyner.
- `Text` — mətn göstərmək üçün.
- `TextInput` — istifadəçidən mətn daxiletmə sahəsi.
- `StyleSheet` — stilləri (CSS-ə bənzər obyektləri) optimallaşdırılmış şəkildə yaratmaq üçün.
- `FlatList` — böyük siyahıları performanslı render edən komponent (yalnız ekranda görünən elementləri render edir).
- `TouchableOpacity` — basılanda "sönükləşən" toxunma effekti verən düymə.

```
12  import { GestureHandlerRootView } from 'react-native-gesture-handler';
13  import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
```
`react-native-gesture-handler` kitabxanasından iki hissə:
- `GestureHandlerRootView` — gesture (jest, sürüşdürmə və s.) əməliyyatlarının işləməsi üçün bütün ağacın ən yuxarısını əhatə etməli olan məcburi "wrapper". Bu olmadan `Swipeable` işləməz.
- `Swipeable` — bir elementi sola/sağa sürüşdürəndə arxada gizli düymə (bizim halda "Delete") göstərməyə imkan verən komponent.

```
15-18  type Todo = {
          id: number;
          title: string;
        };
```
TypeScript tipi: hər bir todo elementinin necə görünəcəyini təsvir edir — `id` (ədəd) və `title` (mətn). Bu, kodun qalan hissəsində səhv tip istifadəsinin qarşısını alır (məsələn `item.title.toUpperCase()` çağırsan, TypeScript `title`-ın string olduğunu bilir).

```
20  let idCounter = 1;
```
**`idCounter` nə üçündür?** Hər yeni todo-ya unikal (təkrarlanmayan) `id` vermək üçün sadə bir sayğacdır (counter). `FlatList`-də `keyExtractor` hər element üçün unikal açar (key) tələb edir ki, React siyahıdakı elementləri düzgün ayırd edə bilsin (hansı silinib, hansı əlavə olunub və s.). Əgər id vermirdik, məsələn `title`-ı açar kimi istifadə etsəydik, iki eyni adlı todo olduqda React onları qarışdırardı. `idCounter++` işlədikdə əvvəlcə cari dəyər istifadə olunur, sonra 1 artırılır (post-increment) — beləcə hər çağırışda fərqli ədəd alınır. Modulun səviyyəsində (component xaricində) təyin olunub ki, komponent yenidən render olsa belə sıfırlanmasın.

```
22  export default function TodoApp(): React.JSX.Element {
```
Komponentin özü — funksional React komponenti, `React.JSX.Element` tipində JSX qaytarır. `export default` başqa fayllarda (`App.tsx`-də) `import TodoApp from './src/components/TodoApp'` ilə çağırmaq üçündür.

```
23-27  const [todos, setTodos] = useState<Todo[]>([
         { id: idCounter++, title: 'React Native öyrən' },
         { id: idCounter++, title: 'Gesture Handler-i araşdır' },
         { id: idCounter++, title: 'Todo App yaz' },
       ]);
```
`todos` — todo-ların massivi (state), `setTodos` — onu dəyişən funksiya. Başlanğıc dəyər olaraq 3 nümunə todo verilib, hər birinə `idCounter++` ilə ardıcıl id (1, 2, 3) təyin olunur.

```
28  const [text, setText] = useState<string>('');
```
İstifadəçinin `TextInput`-a yazdığı cari mətni saxlayan state. Başlanğıcda boş sətir.

```
30-34  const addTodo = (): void => {
         if (text.trim().length === 0) return;
         setTodos((prev) => [...prev, { id: idCounter++, title: text.trim() }]);
         setText('');
       };
```
Yeni todo əlavə edən funksiya:
- `text.trim().length === 0` — əgər istifadəçi yalnız boşluq yazıb və ya heç nə yazmayıbsa, funksiya heç nə etmədən çıxır (boş todo yaranmasının qarşısı alınır).
- `setTodos((prev) => [...prev, {...}])` — köhnə siyahını (`prev`) spread (`...`) edib sonuna yeni todo əlavə edir. Funksional yeniləmə forması istifadə olunur ki, ən son state-ə əsaslansın (React-də state yeniləmələri asinxron ola bilər).
- Yeni todo-ya yenə `idCounter++` ilə unikal id verilir.
- `setText('')` — əlavə etdikdən sonra input sahəsini təmizləyir.

```
36-38  const deleteTodo = (id: number): void => {
         setTodos((prev) => prev.filter((item) => item.id !== id));
       };
```
Verilən `id`-yə uyğun todo-nu siyahıdan silir — `filter` ilə həmin id-dən fərqli bütün elementləri saxlayaraq yeni massiv yaradır (orijinal massiv dəyişdirilmir, bu React-in immutability prinsipidir).

```
40-48  const renderRightActions = (id: number): React.JSX.Element => (
         <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTodo(id)}>
           <Text style={styles.deleteButtonText}>Delete</Text>
         </TouchableOpacity>
       );
```
`Swipeable`-in sürüşdürüləndə sağ tərəfdə göstərdiyi "Delete" düyməsini qaytaran funksiya. Basılanda `deleteTodo(id)` çağırılır.

```
50-56  const renderItem = ({ item }: { item: Todo }): React.JSX.Element => (
         <Swipeable renderRightActions={() => renderRightActions(item.id)}>
           <View style={styles.todoItem}>
             <Text style={styles.todoText}>{item.title}</Text>
           </View>
         </Swipeable>
       );
```
`FlatList`-in hər bir elementi necə render edəcəyini təyin edən funksiya. Hər todo `Swipeable` ilə əhatə olunur ki, sola sürüşdürüləndə `renderRightActions` göstərilsin.

```
58-82  return ( ... )
```
Komponentin JSX-i (ekranda göstəriləcək element ağacı):
- `GestureHandlerRootView style={styles.root}` — bütün gesture-ların işləməsi üçün kök element, `flex: 1` ilə bütün ekranı tutur.
- `View style={styles.container}` — əsas konteyner (üst boşluq, yan boşluqlar, ağ fon).
- `Text style={styles.header}` — "Todo List" başlığı.
- `View style={styles.inputRow}` — input və düyməni üfüqi düzən konteyner:
  - `TextInput` — `value={text}` ilə cari mətni göstərir, `onChangeText={setText}` hər yazılan hərfdə state-i yeniləyir (controlled input).
  - `TouchableOpacity` ("Əlavə et" düyməsi) — basılanda `addTodo`-nu çağırır.
- `FlatList` — `data={todos}` siyahını göstərir, `keyExtractor` hər todo üçün `id`-ni stringə çevirib unikal açar kimi verir, `renderItem` isə yuxarıda təsvir olunan funksiyadır.

```
85-145  const styles = StyleSheet.create({ ... })
```
Bütün stillər burada mərkəzləşdirilib (inline stil əvəzinə). `StyleSheet.create` stilləri React Native-də optimallaşdırılmış formata çevirir. Hər açar (`container`, `header`, `inputRow`, `input`, `addButton`, `addButtonText`, `todoItem`, `todoText`, `deleteButton`, `deleteButtonText`, `root`) yuxarıdakı JSX-də `styles.adı` şəklində istifadə olunan konkret stil obyektidir (rənglər, ölçülər, boşluqlar və s.).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
