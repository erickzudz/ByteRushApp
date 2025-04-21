import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function SubirPreguntas() {
    useEffect(() => {
        const preguntas = [
            // 📚 Categoría: Lógica
            { categoria: 'Lógica', pregunta: '¿Qué nombre recibe el argumento "Si llueve, la calle se moja. Llueve. Por tanto, la calle se moja"?', opciones: ['Modus ponens', 'Modus tollens', 'Silogismo hipotético', 'Falacia'], correcta: 'Modus ponens' },
            { categoria: 'Lógica', pregunta: '¿Qué valor de verdad tiene "Falso ∨ Verdadero"?', opciones: ['Verdadero', 'Falso', 'Indeterminado', 'Ninguno'], correcta: 'Verdadero' },
            { categoria: 'Lógica', pregunta: '¿Cómo se denomina a una proposición compuesta que es verdadera en todos los casos?', opciones: ['Contradicción', 'Tautología', 'Contingencia', 'Equivalencia'], correcta: 'Tautología' },
            { categoria: 'Lógica', pregunta: '¿Qué ley lógica establece que p ∧ q ≡ q ∧ p?', opciones: ['Ley asociativa', 'Ley conmutativa', 'Ley distributiva', 'Ley de identidad'], correcta: 'Ley conmutativa' },
            { categoria: 'Lógica', pregunta: '¿Qué símbolo representa la bicondicional lógica?', opciones: ['→', '∧', '∨', '↔'], correcta: '↔' },
            { categoria: 'Lógica', pregunta: '¿Qué nombre recibe el error lógico de afirmar el consecuente?', opciones: ['Falacia', 'Tautología', 'Contradicción', 'Equivalencia'], correcta: 'Falacia' },
            { categoria: 'Lógica', pregunta: '¿Qué valor tiene "Verdadero ↔ Falso"?', opciones: ['Verdadero', 'Falso', 'Indeterminado', 'Nulo'], correcta: 'Falso' },
            { categoria: 'Lógica', pregunta: '¿Qué operación lógica representa "p a menos que q"?', opciones: ['p ∨ q', 'p ∧ q', '¬p → q', 'p → ¬q'], correcta: '¬p → q' },
            { categoria: 'Lógica', pregunta: '¿Qué regla permite inferir ¬p a partir de p → q y ¬q?', opciones: ['Modus ponens', 'Modus tollens', 'Silogismo', 'Dilema'], correcta: 'Modus tollens' },
            { categoria: 'Lógica', pregunta: '¿Qué nombre recibe la forma "p ∨ q" en lógica?', opciones: ['Conjunción', 'Disyunción', 'Negación', 'Implicación'], correcta: 'Disyunción' },

            // ⚙️ Categoría: Algoritmos
            { categoria: 'Algoritmos', pregunta: '¿Qué algoritmo de ordenamiento es estable y tiene complejidad O(n²)?', opciones: ['Quick Sort', 'Merge Sort', 'Insertion Sort', 'Heap Sort'], correcta: 'Insertion Sort' },
            { categoria: 'Algoritmos', pregunta: '¿Qué estructura de datos usa el algoritmo DFS?', opciones: ['Cola', 'Pila', 'Árbol', 'Grafo'], correcta: 'Pila' },
            { categoria: 'Algoritmos', pregunta: '¿Qué técnica usa el algoritmo de Prim para encontrar árboles de expansión mínima?', opciones: ['Divide y vencerás', 'Programación dinámica', 'Voraz', 'Backtracking'], correcta: 'Voraz' },
            { categoria: 'Algoritmos', pregunta: '¿Qué complejidad tiene el algoritmo de búsqueda lineal en el peor caso?', opciones: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correcta: 'O(n)' },
            { categoria: 'Algoritmos', pregunta: '¿Qué algoritmo resuelve el problema del viajante con enfoque voraz?', opciones: ['Dijkstra', 'Prim', 'Kruskal', 'Vecino más cercano'], correcta: 'Vecino más cercano' },
            { categoria: 'Algoritmos', pregunta: '¿Qué estructura es óptima para implementar un diccionario con búsquedas rápidas?', opciones: ['Lista enlazada', 'Tabla hash', 'Arreglo', 'Pila'], correcta: 'Tabla hash' },
            { categoria: 'Algoritmos', pregunta: '¿Qué algoritmo encuentra los componentes fuertemente conexos en un grafo?', opciones: ['Dijkstra', 'Kosaraju', 'Prim', 'Kruskal'], correcta: 'Kosaraju' },
            { categoria: 'Algoritmos', pregunta: '¿Qué método de búsqueda usa "divide y vencerás" en arreglos ordenados?', opciones: ['Búsqueda secuencial', 'Búsqueda binaria', 'Búsqueda hash', 'Búsqueda por interpolación'], correcta: 'Búsqueda binaria' },
            { categoria: 'Algoritmos', pregunta: '¿Qué algoritmo de ordenamiento es in-place y tiene complejidad O(n log n)?', opciones: ['Merge Sort', 'Heap Sort', 'Quick Sort', 'Bubble Sort'], correcta: 'Heap Sort' },
            { categoria: 'Algoritmos', pregunta: '¿Qué estructura usa el algoritmo BFS?', opciones: ['Pila', 'Cola', 'Árbol', 'Grafo'], correcta: 'Cola' },

            // 🕸️ Categoría: Redes
            { categoria: 'Redes', pregunta: '¿Qué protocolo se usa para transferencia segura de archivos?', opciones: ['HTTP', 'SFTP', 'SMTP', 'DNS'], correcta: 'SFTP' },
            { categoria: 'Redes', pregunta: '¿Qué dispositivo opera en la capa física del modelo OSI?', opciones: ['Router', 'Switch', 'Hub', 'Firewall'], correcta: 'Hub' },
            { categoria: 'Redes', pregunta: '¿Qué tipo de cable de red tiene mayor ancho de banda?', opciones: ['UTP Cat5', 'UTP Cat6', 'Fibra óptica', 'Coaxial'], correcta: 'Fibra óptica' },
            { categoria: 'Redes', pregunta: '¿Qué protocolo se usa para consultas de nombres de dominio?', opciones: ['DHCP', 'DNS', 'FTP', 'HTTP'], correcta: 'DNS' },
            { categoria: 'Redes', pregunta: '¿Qué puerto usa el protocolo SSH?', opciones: ['21', '22', '23', '25'], correcta: '22' },
            { categoria: 'Redes', pregunta: '¿Qué tecnología permite múltiples direcciones IP en un solo interfaz?', opciones: ['NAT', 'VLAN', 'Subnetting', 'CIDR'], correcta: 'NAT' },
            { categoria: 'Redes', pregunta: '¿Qué comando muestra las conexiones activas en Windows?', opciones: ['ipconfig', 'ping', 'netstat', 'tracert'], correcta: 'netstat' },
            { categoria: 'Redes', pregunta: '¿Qué tipo de red cubre un área geográfica extensa?', opciones: ['LAN', 'WAN', 'MAN', 'PAN'], correcta: 'WAN' },
            { categoria: 'Redes', pregunta: '¿Qué protocolo es orientado a conexión?', opciones: ['UDP', 'TCP', 'ICMP', 'ARP'], correcta: 'TCP' },
            { categoria: 'Redes', pregunta: '¿Qué dispositivo filtra tráfico basado en reglas de seguridad?', opciones: ['Switch', 'Router', 'Firewall', 'Hub'], correcta: 'Firewall' },

            // 🧩 Categoría: BD
            { categoria: 'BD', pregunta: '¿Qué comando SQL crea una nueva tabla?', opciones: ['NEW TABLE', 'CREATE TABLE', 'ADD TABLE', 'DEFINE TABLE'], correcta: 'CREATE TABLE' },
            { categoria: 'BD', pregunta: '¿Qué tipo de JOIN devuelve solo registros coincidentes?', opciones: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'], correcta: 'INNER JOIN' },
            { categoria: 'BD', pregunta: '¿Qué restricción garantiza que un campo no sea nulo?', opciones: ['PRIMARY KEY', 'UNIQUE', 'NOT NULL', 'FOREIGN KEY'], correcta: 'NOT NULL' },
            { categoria: 'BD', pregunta: '¿Qué operación relacional combina tablas horizontalmente?', opciones: ['UNION', 'JOIN', 'PROJECT', 'SELECT'], correcta: 'JOIN' },
            { categoria: 'BD', pregunta: '¿Qué palabra clave ordena resultados en SQL?', opciones: ['GROUP BY', 'ORDER BY', 'SORT BY', 'ARRANGE BY'], correcta: 'ORDER BY' },
            { categoria: 'BD', pregunta: '¿Qué modelo de base de datos usa nodos y relaciones?', opciones: ['Documental', 'Grafo', 'Clave-valor', 'Columnar'], correcta: 'Grafo' },
            { categoria: 'BD', pregunta: '¿Qué función SQL cuenta registros?', opciones: ['SUM()', 'AVG()', 'COUNT()', 'TOTAL()'], correcta: 'COUNT()' },
            { categoria: 'BD', pregunta: '¿Qué propiedad ACID garantiza que los cambios persistan?', opciones: ['Atomicidad', 'Consistencia', 'Aislamiento', 'Durabilidad'], correcta: 'Durabilidad' },
            { categoria: 'BD', pregunta: '¿Qué comando elimina todos los registros pero mantiene la tabla?', opciones: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'], correcta: 'TRUNCATE' },
            { categoria: 'BD', pregunta: '¿Qué tipo de base de datos es Redis?', opciones: ['Relacional', 'Documental', 'Clave-valor', 'Grafo'], correcta: 'Clave-valor' },

            // 📐 Categoría: Matemática
            { categoria: 'Matemática', pregunta: '¿Cuánto es 5! (factorial de 5)?', opciones: ['25', '60', '120', '720'], correcta: '120' },
            { categoria: 'Matemática', pregunta: '¿Qué tipo de triángulo tiene todos sus lados iguales?', opciones: ['Escaleno', 'Isósceles', 'Equilátero', 'Rectángulo'], correcta: 'Equilátero' },
            { categoria: 'Matemática', pregunta: '¿Cuál es la integral de 2x?', opciones: ['x²', 'x² + C', '2x²', '2x² + C'], correcta: 'x² + C' },
            { categoria: 'Matemática', pregunta: '¿Qué número es primo?', opciones: ['9', '15', '17', '21'], correcta: '17' },
            { categoria: 'Matemática', pregunta: '¿Qué fórmula calcula el volumen de una esfera?', opciones: ['4/3πr³', 'πr²h', '2πr', 'πr²'], correcta: '4/3πr³' },
            { categoria: 'Matemática', pregunta: '¿Qué significa el símbolo "≠"?', opciones: ['Aproximadamente', 'Infinito', 'No igual', 'Congruente'], correcta: 'No igual' },
            { categoria: 'Matemática', pregunta: '¿Cuál es el mínimo común múltiplo de 6 y 8?', opciones: ['12', '24', '36', '48'], correcta: '24' },
            { categoria: 'Matemática', pregunta: '¿Qué tipo de ángulo mide exactamente 180°?', opciones: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correcta: 'Llano' },
            { categoria: 'Matemática', pregunta: '¿Qué propiedad dice que a(b + c) = ab + ac?', opciones: ['Conmutativa', 'Asociativa', 'Distributiva', 'Identidad'], correcta: 'Distributiva' },
            { categoria: 'Matemática', pregunta: '¿Cuál es la derivada de ln(x)?', opciones: ['1/x', 'x', 'e^x', 'ln(x)'], correcta: '1/x' }];

        const subirPreguntas = async () => {
            try {
                for (const pregunta of preguntas) {
                    await addDoc(collection(db, 'preguntas'), pregunta);
                }
                console.log('✅ Preguntas subidas correctamente');
            } catch (error) {
                console.error('❌ Error al subir preguntas:', error);
            }
        };

        subirPreguntas();
    }, []);

    return (
        <View style={styles.container} >
            <Text style={styles.text}> Subiendo preguntas a Firestore...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0a',
    },
    text: {
        color: '#00ff88',
        fontSize: 18,
    },
});