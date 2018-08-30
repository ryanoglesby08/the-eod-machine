import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(createSerializer(emotion))
