// 📚 PROPYPES EKSEMPLER MED DETALJEREDE KOMMENTARER

// Importerer PropTypes biblioteket
import PropTypes from "prop-types";

// ========================================
// 1. GRUNDLÆGGENDE PROPYPES TYPER
// ========================================

function BasicExample({ name, age, isActive, onClick, data, items }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Alder: {age}</p>
      <p>Status: {isActive ? "Aktiv" : "Inaktiv"}</p>
      <button onClick={onClick}>Klik mig</button>
      <p>Data: {JSON.stringify(data)}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// PropTypes definition for BasicExample
BasicExample.propTypes = {
  // STRING - Forventer tekst
  name: PropTypes.string,

  // NUMBER - Forventer tal
  age: PropTypes.number,

  // BOOLEAN - Forventer true/false
  isActive: PropTypes.bool,

  // FUNCTION - Forventer en funktion
  onClick: PropTypes.func,

  // OBJECT - Forventer et objekt
  data: PropTypes.object,

  // ARRAY - Forventer et array
  items: PropTypes.array,

  // REQUIRED vs OPTIONAL
  // .isRequired betyder at prop'en SKAL være til stede
  // Uden .isRequired er prop'en valgfri
  requiredString: PropTypes.string.isRequired, // PÅKRÆVET - skal være string
  optionalString: PropTypes.string, // VALGFRI - kan være string eller undefined
};

// ========================================
// 2. AVANCEREDE PROPYPES TYPER
// ========================================

function AdvancedExample({
  status,
  numbers,
  user,
  id,
  children,
  customValidator,
}) {
  return (
    <div>
      <p>Status: {status}</p>
      <p>Tal: {numbers.join(", ")}</p>
      <p>
        Bruger: {user.name} ({user.email})
      </p>
      <p>ID: {id}</p>
      <div>{children}</div>
    </div>
  );
}

AdvancedExample.propTypes = {
  // ONEOF - Kun specifikke værdier er tilladt
  status: PropTypes.oneOf(["loading", "success", "error"]),
  // ✅ Tilladt: status="loading"
  // ❌ Fejl: status="invalid"

  // ARRAYOF - Array der kun indeholder en specifik type
  numbers: PropTypes.arrayOf(PropTypes.number),
  // ✅ Tilladt: numbers={[1, 2, 3]}
  // ❌ Fejl: numbers={[1, "text", 3]}

  // SHAPE - Objekt med specifikke properties
  user: PropTypes.shape({
    id: PropTypes.string.isRequired, // Påkrævet string
    name: PropTypes.string.isRequired, // Påkrævet string
    email: PropTypes.string, // Valgfri string
    age: PropTypes.number, // Valgfri number
  }),
  // ✅ Tilladt: user={{id: "1", name: "John", email: "john@example.com"}}
  // ❌ Fejl: user={{id: "1"}} (mangler name)

  // ONEOFTYPE - Union type (flere typer tilladt)
  id: PropTypes.oneOfType([
    PropTypes.string, // Kan være string
    PropTypes.number, // Eller number
  ]),
  // ✅ Tilladt: id="123" eller id={123}

  // NODE - React elementer (JSX, strings, numbers)
  children: PropTypes.node,
  // ✅ Tilladt: <div>Tekst</div>, "Tekst", 123, <Component />

  // CUSTOM VALIDATOR - Din egen valideringsfunktion
  customValidator: function (props, propName, componentName) {
    // Tjek om værdien er et lige tal
    if (props[propName] % 2 !== 0) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ` +
          `Expected an even number.`
      );
    }
  },
};

// ========================================
// 3. EKSEMPLER FRA DIN KODE
// ========================================

// PostCard komponenten
function PostCard({ post, disableNavigation = false }) {
  return (
    <article>
      <img src={post.image} alt={post.caption} />
      <h2>{post.caption}</h2>
    </article>
  );
}

PostCard.propTypes = {
  // SHAPE - post skal være et objekt med specifikke properties
  post: PropTypes.shape({
    id: PropTypes.string.isRequired, // Post ID (påkrævet string)
    uid: PropTypes.string.isRequired, // User ID (påkrævet string)
    image: PropTypes.string.isRequired, // Image URL (påkrævet string)
    caption: PropTypes.string.isRequired, // Caption tekst (påkrævet string)
  }).isRequired, // Hele post objektet er påkrævet

  // BOOLEAN - disableNavigation er valgfri boolean
  disableNavigation: PropTypes.bool, // Kan være true, false eller undefined
};

// PostForm komponenten
function PostForm({ savePost, post, isSubmitting = false, onCancel }) {
  return (
    <form>
      <input type="text" />
      <button type="submit">Gem</button>
    </form>
  );
}

PostForm.propTypes = {
  // FUNCTION - savePost skal være en funktion
  savePost: PropTypes.func.isRequired, // Påkrævet funktion

  // SHAPE - post er valgfri, men hvis den findes skal den have caption og image
  post: PropTypes.shape({
    caption: PropTypes.string, // Valgfri caption string
    image: PropTypes.string, // Valgfri image string
  }), // Hele post objektet er valgfri

  // BOOLEAN - isSubmitting er valgfri boolean
  isSubmitting: PropTypes.bool, // Kan være true, false eller undefined

  // FUNCTION - onCancel er valgfri funktion
  onCancel: PropTypes.func, // Kan være funktion eller undefined
};

// UserAvatar komponenten
function UserAvatar({ uid }) {
  return (
    <div>
      <img src="avatar.jpg" alt="User" />
      <span>User {uid}</span>
    </div>
  );
}

UserAvatar.propTypes = {
  // STRING - uid skal være en string
  uid: PropTypes.string.isRequired, // Påkrævet string
};

// ========================================
// 4. FEJL EKSEMPLER OG ADVARSELER
// ========================================

/*
HVAD SKER DER NÅR PROP TYPES FEJLER?

1. STRING I STEDET FOR OBJECT:
   <PostCard post="invalid string" />
   
   ⚠️ Warning: Failed prop type: Invalid prop `post` of type `string` 
   supplied to `PostCard`, expected `object`.

2. MANGEL PÅ PÅKRÆVET PROP:
   <PostCard /> // Ingen post prop
   
   ⚠️ Warning: Failed prop type: The prop `post` is marked as required 
   in `PostCard`, but its value is `undefined`.

3. FORKERT TYPE I SHAPE:
   <PostCard post={{id: 123, caption: "test"}} /> // id er number, ikke string
   
   ⚠️ Warning: Failed prop type: Invalid prop `post.id` of type `number` 
   supplied to `PostCard`, expected `string`.

4. FORKERT ONEOF VÆRDI:
   <AdvancedExample status="invalid" />
   
   ⚠️ Warning: Failed prop type: Invalid prop `status` of value `invalid` 
   supplied to `AdvancedExample`, expected one of ["loading","success","error"].
*/

// ========================================
// 5. DEFAULT VALUES
// ========================================

function ComponentWithDefaults({ title, count, isVisible }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      {isVisible && <p>Jeg er synlig!</p>}
    </div>
  );
}

ComponentWithDefaults.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  isVisible: PropTypes.bool,
};

// DEFAULT VALUES - bruges hvis prop ikke sendes med
ComponentWithDefaults.defaultProps = {
  title: "Standard Titel", // Hvis ingen title sendes, brug "Standard Titel"
  count: 0, // Hvis ingen count sendes, brug 0
  isVisible: true, // Hvis ingen isVisible sendes, brug true
};

// ========================================
// 6. HVORFOR BRUGE PROP TYPES?
// ========================================

/*
FORDELER:

1. TYPE SAFETY
   - Fanger fejl tidligt i udviklingsprocessen
   - Forhindrer runtime fejl

2. DOKUMENTATION
   - Viser tydeligt hvad komponenten forventer
   - Fungerer som API dokumentation

3. TEAM COLLABORATION
   - Andre udviklere kan nemt se hvad props komponenten kræver
   - Reducerer fejl når flere arbejder på samme kodebase

4. DEBUGGING
   - Giver klare fejlbeskeder når props er forkerte
   - Nemmere at finde fejl

5. CODE QUALITY
   - Tvinger dig til at tænke over komponentens API
   - Forbedrer kodekvalitet

BEGRÆNSNINGER:

1. KUN DEVELOPMENT
   - PropTypes kører kun i development mode
   - Fjernes automatisk i production builds

2. IKKE RUNTIME VALIDATION
   - Giver kun advarsler, stopper ikke koden
   - Ikke til at validere user input

3. ALTERNATIVER FINDES
   - TypeScript giver bedre type safety
   - Flow er også en mulighed
*/

export {
  BasicExample,
  AdvancedExample,
  PostCard,
  PostForm,
  UserAvatar,
  ComponentWithDefaults,
};

