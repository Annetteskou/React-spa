# 📚 PropTypes Praktisk Guide

## 🎯 **Hvad er PropTypes?**

PropTypes er et **valideringsbibliotek** til React der hjælper dig med at:

- ✅ **Tjekke** at props har de rigtige typer
- ✅ **Dokumentere** hvad din komponent forventer
- ✅ **Fange fejl** tidligt i udviklingsprocessen

## 🔧 **Sådan installeres PropTypes**

```bash
# Hvis det ikke allerede er installeret
npm install prop-types
```

## 📝 **Grundlæggende syntaks**

```javascript
import PropTypes from "prop-types";

function MyComponent({ name, age }) {
  return (
    <div>
      {name} er {age} år gammel
    </div>
  );
}

// PropTypes definition
MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};
```

## 🎨 **Alle PropTypes typer**

### **Grundlæggende typer:**

```javascript
MyComponent.propTypes = {
  // Primitiver
  name: PropTypes.string, // String
  age: PropTypes.number, // Number
  isActive: PropTypes.bool, // Boolean
  onClick: PropTypes.func, // Function
  data: PropTypes.object, // Object
  items: PropTypes.array, // Array

  // Required vs Optional
  requiredString: PropTypes.string.isRequired, // PÅKRÆVET
  optionalString: PropTypes.string, // VALGFRI
};
```

### **Avancerede typer:**

```javascript
MyComponent.propTypes = {
  // Specifikke værdier
  status: PropTypes.oneOf(["loading", "success", "error"]),

  // Array af specifik type
  numbers: PropTypes.arrayOf(PropTypes.number),

  // Objekt med specifikke properties
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),

  // Union types
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // React elementer
  children: PropTypes.node,
};
```

## 💡 **Eksempler fra din kode**

### **PostCard komponenten:**

```javascript
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired, // Post ID (påkrævet)
    uid: PropTypes.string.isRequired, // User ID (påkrævet)
    image: PropTypes.string.isRequired, // Image URL (påkrævet)
    caption: PropTypes.string.isRequired, // Caption tekst (påkrævet)
  }).isRequired, // Hele post objektet er påkrævet
  disableNavigation: PropTypes.bool, // Valgfri boolean
};
```

**Forklaring:**

- `post` skal være et objekt med specifikke properties
- Hver property i post objektet er påkrævet
- `disableNavigation` er valgfri

### **PostForm komponenten:**

```javascript
PostForm.propTypes = {
  savePost: PropTypes.func.isRequired, // Påkrævet funktion
  post: PropTypes.shape({
    // Valgfri post objekt
    caption: PropTypes.string, // Valgfri caption
    image: PropTypes.string, // Valgfri image
  }),
  isSubmitting: PropTypes.bool, // Valgfri loading state
  onCancel: PropTypes.func, // Valgfri cancel funktion
};
```

**Forklaring:**

- `savePost` er påkrævet funktion
- `post` er valgfri, men hvis den findes skal den have caption og image
- `isSubmitting` og `onCancel` er valgfri

## ⚠️ **Fejl eksempler og advarsler**

### **1. Forkert type:**

```javascript
<PostCard post="string instead of object" />
```

**Advarsel:**

```
Warning: Failed prop type: Invalid prop `post` of type `string`
supplied to `PostCard`, expected `object`.
```

### **2. Manglende påkrævet prop:**

```javascript
<PostCard /> // Ingen post prop
```

**Advarsel:**

```
Warning: Failed prop type: The prop `post` is marked as required
in `PostCard`, but its value is `undefined`.
```

### **3. Forkert type i shape:**

```javascript
<PostCard post={{ id: 123, caption: "test" }} /> // id er number, ikke string
```

**Advarsel:**

```
Warning: Failed prop type: Invalid prop `post.id` of type `number`
supplied to `PostCard`, expected `string`.
```

## 🎯 **Best Practices**

### **1. Brug .isRequired når det giver mening**

```javascript
// ✅ Godt - id er altid påkrævet
id: PropTypes.string.isRequired,

// ✅ Godt - email er valgfri
email: PropTypes.string,
```

### **2. Brug shape for objekter**

```javascript
// ✅ Godt - specifik struktur
user: PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}),

// ❌ Dårligt - for generisk
user: PropTypes.object,
```

### **3. Brug oneOf for specifikke værdier**

```javascript
// ✅ Godt - kun tilladte værdier
status: PropTypes.oneOf(['loading', 'success', 'error']),

// ❌ Dårligt - for generisk
status: PropTypes.string,
```

### **4. Kombiner med defaultProps**

```javascript
MyComponent.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

MyComponent.defaultProps = {
  title: "Standard Titel",
  count: 0,
};
```

## 🚀 **Fordele ved PropTypes**

### **1. Type Safety**

- Fanger fejl tidligt
- Forhindrer runtime fejl

### **2. Documentation**

- Fungerer som API dokumentation
- Viser tydeligt hvad komponenten forventer

### **3. Team Collaboration**

- Andre udviklere kan nemt se hvad props komponenten kræver
- Reducerer fejl når flere arbejder på samme kodebase

### **4. Debugging**

- Giver klare fejlbeskeder
- Nemmere at finde fejl

## ⚠️ **Begrænsninger**

### **1. Kun i development**

- PropTypes kører kun i development mode
- Fjernes automatisk i production builds

### **2. Ikke runtime validation**

- Giver kun advarsler, stopper ikke koden
- Ikke til at validere user input

### **3. Alternativer findes**

- **TypeScript** - Statisk type checking (endnu bedre)
- **Flow** - Facebook's type checker

## 🎯 **Konklusion**

PropTypes er en **udviklingshjælper** der:

- ✅ **Validerer** at props har rigtige typer
- ✅ **Dokumenterer** hvad komponenten forventer
- ✅ **Fanger fejl** tidligt i udviklingsprocessen
- ✅ **Forbedrer** kodekvalitet og vedligeholdelse

**Det er en best practice i React udvikling!** 🚀




