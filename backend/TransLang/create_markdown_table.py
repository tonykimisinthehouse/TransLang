
fileName = 'tmp.md'
lines = []
with open(fileName) as f: # read
    switch = False
    for line in f: 
        if switch:
            words = line.split()
            print("words", words)
            newLine = '| ' + words[0] + ' | ' + ' '.join(words[1:-2]) + ' | ' + words[-2] + ' | ' + words[-1] + ' |'
            # newLine = '| ' + ' '.join(words[:-1]) + ' | ' + words[-1] + ' |'
            print(newLine) 
            _ = input("enter")
            lines.append(newLine)
        else:
            lines.append(line)
        if '---' in line:
            switch = True

with open(fileName, "w") as f:
    for l in lines:
        f.write(l + '\n')
        